import Link from "next/link";

import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";

const RightSideBar = ({ user, transactions, banks }: RightSideBarProps) => {
	const categories: CategoryCount[] = countTransactionCategories(transactions);

	const topCategories = categories?.slice(0, 6);

	return (
		<aside className="right-sidebar">
			<section className="flex flex-col pb-8">
				<div className="profile-banner" />

				<div className="profile">
					<div className="profile-img">
						<span className="text-5xl font-bold text-bankGradient">
							{user?.firstName[0]}
						</span>
					</div>

					<div className="profile-details">
						<h1 className="profile-name">
							{user?.firstName} {user?.lastName}
						</h1>
						<p className="profile-email">{user?.email}</p>
					</div>
				</div>
			</section>

			<section className="banks">
				<div className="flex w-full justify-between">
					<h2 className="header-2">My Banks</h2>
					<Link href="/my-banks">
						<h2 className="text-14 font-semibold text-gray-600">View all</h2>
					</Link>
				</div>
				{banks?.length > 0 && (
					<div className="relative flex flex-col justify-center gap-5 flex-1 items-center">
						<div className="relative z-10 w-full pr-3">
							<BankCard
								key={banks[0].$id}
								account={banks[0]}
								userName={`${user?.firstName} ${user?.lastName}`}
								showBalance={false}
							/>
						</div>
						{banks[1] && (
							<div className="absolute right-0 top-[17px] z-0 w-[97%]">
								<BankCard
									key={banks[1].$id}
									account={banks[1]}
									userName={`${user?.firstName} ${user?.lastName}`}
									showBalance={false}
								/>
							</div>
						)}
					</div>
				)}

				<div className="mt-10 flex flex-1 flex-col gap-6">
					<h2 className="header-2">Top categories</h2>

					<div className="space-y-5">
						{topCategories?.map((category) => (
							<Category key={category?.name} category={category} />
						))}
					</div>
				</div>
			</section>
		</aside>
	);
};

export default RightSideBar;
