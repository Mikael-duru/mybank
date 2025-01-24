import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
	const loggedInUser = await getLoggedInUser();

	return (
		<div className="home">
			<main className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedInUser?.name || "Guest"}
						subtext="Access and Manage your account and transactions efficiently."
					/>

					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={1234.56}
					/>
				</header>
			</main>

			<RightSideBar
				user={loggedInUser}
				transactions={[]}
				banks={[{ currentBalance: 125.5 }, { currentBalance: 234.6 }]}
			/>
		</div>
	);
};

export default Home;
