import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";

function Home() {
	const loggedIn = {
		firstName: "Mikael",
		lastName: "Duru",
		email: "durumikaelc@gmail.com",
	};

	return (
		<div className="home">
			<main className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.firstName || "Guest"}
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
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 125.5 }, { currentBalance: 234.6 }]}
			/>
		</div>
	);
}

export default Home;
