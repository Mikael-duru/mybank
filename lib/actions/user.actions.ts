"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
	CountryCode,
	ProcessorTokenCreateRequest,
	ProcessorTokenCreateRequestProcessorEnum,
	Products,
} from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
	APPWRITE_DATABASE_ID,
	APPWRITE_USER_COLLECTION_ID,
	APPWRITE_BANK_COLLECTION_ID,
} = process.env;

export const registerUser = async ({ password, ...userData }: SignUpParams) => {
	const { email, firstName, lastName } = userData;

	let newUserAccount;

	try {
		const { account, database } = await createAdminClient();

		newUserAccount = await account.create(
			ID.unique(),
			email,
			password,
			`${firstName} ${lastName}`
		);

		if (!newUserAccount) throw new Error("Error creating user");

		const dwollaCustomerUrl = await createDwollaCustomer({
			...userData,
			type: "personal",
		});

		if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

		const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

		const newUser = await database.createDocument(
			APPWRITE_DATABASE_ID!,
			APPWRITE_USER_COLLECTION_ID!,
			ID.unique(),
			{
				...userData,
				userId: newUserAccount?.$id,
				dwollaCustomerId,
				dwollaCustomerUrl,
			}
		);

		const session = await account.createEmailPasswordSession(email, password);

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return parseStringify(newUser);
	} catch (error) {
		console.log("[REGISTER_USER]:", error);
	}
};

export const authUser = async ({ userEmail, userPassword }: signInProps) => {
	try {
		const { account } = await createAdminClient();

		const response = await account.createEmailPasswordSession(
			userEmail,
			userPassword
		);

		return parseStringify(response);
	} catch (error) {
		console.log("[AUTH_USER]:", error);
	}
};

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();

		const user = await account.get();

		return parseStringify(user);
	} catch (error) {
		return null;
	}
}

export const logoutAccount = async () => {
	try {
		const { account } = await createSessionClient();

		cookies().delete("appwrite-session");

		await account.deleteSession("current");
	} catch (error) {
		return null;
	}
};

export const createLinkToken = async (user: User) => {
	try {
		const tokenParams = {
			user: {
				client_user_id: user?.$id,
			},
			client_name: `${user?.firstName} ${user?.lastName}`,
			products: ["auth"] as Products[],
			language: "en",
			country_codes: ["US"] as CountryCode[],
		};

		const response = await plaidClient.linkTokenCreate(tokenParams);

		return parseStringify({ linkToken: response?.data?.link_token });
	} catch (error) {
		console.log("[CREATE_LINK_TOKEN]:", error);
	}
};

// In appwrite database
export const createBankAccount = async ({
	userId,
	bankId,
	accountId,
	accessToken,
	fundingSourceUrl,
	shareableId,
}: createBankAccountProps) => {
	try {
		const { database } = await createAdminClient();

		const bankAccount = await database.createDocument(
			APPWRITE_DATABASE_ID!,
			APPWRITE_BANK_COLLECTION_ID!,
			ID.unique(),
			{
				userId,
				bankId,
				accountId,
				accessToken,
				fundingSourceUrl,
				shareableId,
			}
		);

		return parseStringify(bankAccount);
	} catch (error) {
		console.log("[CREATE_BANK_ACCOUNT]:", error);
	}
};

export const exchangePublicToken = async ({
	publicToken,
	user,
}: exchangePublicTokenProps) => {
	try {
		// 1. Exchange public token for access token and item Id.
		const response = await plaidClient.itemPublicTokenExchange({
			public_token: publicToken,
		});

		const accessToken = response?.data?.access_token;
		const itemId = response?.data?.item_id;

		// 2. Use the accessToken to get account information from Plaid.
		const accountResponse = await plaidClient.accountsGet({
			access_token: accessToken,
		});

		// Take the first account.
		const accountData = accountResponse?.data?.accounts[0];

		// 3. Using the accessToken and account Id, create a processor token to connect to Dwolla (a payment processing service).
		const request: ProcessorTokenCreateRequest = {
			access_token: accessToken,
			account_id: accountData?.account_id,
			processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
		};

		const processorTokenResponse = await plaidClient.processorTokenCreate(
			request
		);

		const processorToken = processorTokenResponse?.data?.processor_token;

		// Fund the account by creating a funding source URL for the account using a server action from dwolla (that accepts Dwolla customer Id, processorToken, and bank name).
		const fundingSourceUrl = await addFundingSource({
			dwollaCustomerId: user?.dwollaCustomerId,
			processorToken,
			bankName: accountData?.name,
		});

		// if the funding source URL is not created, throw an error.
		if (!fundingSourceUrl) throw Error;

		// Else create a bank account in the appwrite database using the user Id, item Id, account id, accessToken, fundingSourceUrl, and shareable Id.
		await createBankAccount({
			userId: user?.$id,
			bankId: itemId,
			accountId: accountData?.account_id,
			accessToken,
			fundingSourceUrl,
			shareableId: encryptId(accountData?.account_id),
		});

		// After creating the account, revalidate the path to reflect the changes.
		revalidatePath("/");

		// Return a success message
		return parseStringify({ publicTokenExchange: "complete" });
	} catch (error) {
		console.log("[EXCHANGE_PUBLIC_TOKEN]:", error);
	}
};
