"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../server/appwrite";
import { parseStringify } from "../utils";

const { APPWRITE_DATABASE_ID, APPWRITE_TRANSACTION_COLLECTION_ID } =
	process.env;

export const createTransaction = async (
	transaction: CreateTransactionProps
) => {
	try {
		const { database } = await createAdminClient();

		const newTransaction = await database.createDocument(
			APPWRITE_DATABASE_ID!,
			APPWRITE_TRANSACTION_COLLECTION_ID!,
			ID.unique(),
			{
				...transaction,
				channel: "online",
				category: "Transfer",
			}
		);

		return parseStringify(newTransaction);
	} catch (error) {
		console.log("[CREATE_TRANSACTION]", error);
	}
};

export const getTransactionsByBankId = async ({
	bankId,
}: getTransactionsByBankIdProps) => {
	try {
		const { database } = await createAdminClient();

		const senderTransactions = await database.listDocuments(
			APPWRITE_DATABASE_ID!,
			APPWRITE_TRANSACTION_COLLECTION_ID!,
			[Query.equal("senderBankId", bankId)]
		);

		const receiverTransactions = await database.listDocuments(
			APPWRITE_DATABASE_ID!,
			APPWRITE_TRANSACTION_COLLECTION_ID!,
			[Query.equal("receiverBankId", bankId)]
		);

		const transactions = {
			total: senderTransactions.total + receiverTransactions.total,
			document: [
				...senderTransactions.documents,
				...receiverTransactions.documents,
			],
		};

		return parseStringify(transactions);
	} catch (error) {
		console.log("[CREATE_TRANSACTION]", error);
	}
};
