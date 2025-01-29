import { BankTabItem } from "@/components/BankTabItem";
import HeaderBox from "@/components/HeaderBox";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import { Pagination } from "@/components/Pagination";

const TransactionHistory = async ({
	searchParams: { id, page },
}: SearchParamProps) => {
	const currentPage = Number(page as string) || 1;
	const loggedInUser = await getLoggedInUser();

	const accounts = await getAccounts({
		userId: loggedInUser.$id,
	});

	if (!accounts) return;

	const accountsData = accounts?.data;

	const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

	const account = await getAccount({ appwriteItemId });

	const rowsPerPage = 10;
	const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
	const indexOfLastTransaction = currentPage * rowsPerPage;
	const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

	const currentTransactions = account?.transactions?.slice(
		indexOfFirstTransaction,
		indexOfLastTransaction
	);

	return (
		<section className="transactions">
			<div className="transactions-header">
				<HeaderBox
					title="Transaction History"
					subtext="See your bank details and transactions."
				/>
			</div>

			<div className="space-y-6">
				<div className="transactions-account">
					<div className="flex flex-col gap-2">
						<h2 className="text-18 font-bold text-white ">
							{account?.data?.name}
						</h2>
						<p className="text-14 text-green-50">
							{account?.data?.officialName}
						</p>
						<p className="text-16 font-ibm-plex-serif font-semibold tracking-[1.1px] text-white">
							●●●●&nbsp; ●●●●&nbsp; ●●●●&nbsp; {account?.data?.mask}
						</p>
					</div>

					<div className="transactions-account-balance">
						<p className="text-14">Current balance</p>
						<p className="text-24 text-center font-bold">
							{formatAmount(account?.data?.currentBalance)}
						</p>
					</div>
				</div>

				<section className="flex w-full flex-col gap-6">
					<Tabs defaultValue={appwriteItemId} className="w-full">
						<TabsList className="recent-transactions-tablist">
							{accountsData?.map((account: Account) => (
								<TabsTrigger key={account?.id} value={account?.appwriteItemId}>
									<BankTabItem
										key={account?.id}
										account={account}
										appwriteItemId={appwriteItemId}
									/>
								</TabsTrigger>
							))}
						</TabsList>

						<TransactionsTable transactions={currentTransactions} />

						{totalPages > 1 && (
							<div className="my-4 w-full">
								<Pagination totalPages={totalPages} page={currentPage} />
							</div>
						)}
					</Tabs>
				</section>
			</div>
		</section>
	);
};

export default TransactionHistory;
