import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({ searchParams: { id } }: SearchParamProps) => {
	const loggedInUser = await getLoggedInUser();

	const accounts = await getAccounts({
		userId: loggedInUser.$id,
	});

	if (!accounts) return;

	const accountsData = accounts?.data;

	const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

	const account = await getAccount({ appwriteItemId });

	return (
		<div className="home">
			<main className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedInUser?.firstName || "Guest"}
						subtext="Access and Manage your account and transactions efficiently."
					/>

					<TotalBalanceBox
						accounts={accountsData}
						totalBanks={accounts?.totalBanks}
						totalCurrentBalance={accounts?.totalCurrentBalance}
					/>
				</header>

				<RecentTransactions
					accounts={accountsData}
					transactions={account?.transactions}
					appwriteItemId={appwriteItemId}
				/>
			</main>

			<RightSideBar
				user={loggedInUser}
				transactions={account?.transactions}
				banks={accountsData?.slice(0, 2)}
			/>
		</div>
	);
};

export default Home;
