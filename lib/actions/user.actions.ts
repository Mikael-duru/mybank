"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const registerUser = async (userData: SignUpParams) => {
	try {
		const { email, password, firstName, lastName } = userData;

		const { account } = await createAdminClient();

		const newUserAccount = await account.create(
			ID.unique(),
			email,
			password,
			`${firstName} ${lastName}`
		);

		const session = await account.createEmailPasswordSession(email, password);

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return parseStringify(newUserAccount);
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
