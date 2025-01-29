import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const MyBanks = async () => {
	const loggedInUser = await getLoggedInUser();

	const accounts = await getAccounts({
		userId: loggedInUser.$id,
	});
	return (
		<section className="flex">
			<div className="my-banks">
				<HeaderBox
					title="Connected Banks"
					subtext="Effortlessly manage your banking activities."
				/>

				<div className="space-y-4 pb-4">
					<h2 className="header-2">Your cards</h2>
					<div className="grid grid-cols-1 sm:flex flex-wrap gap-6">
						{accounts &&
							accounts?.data?.map((acct: Account) => (
								<BankCard
									key={accounts?.id}
									account={acct}
									userName={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
									showBalance={true}
								/>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyBanks;
