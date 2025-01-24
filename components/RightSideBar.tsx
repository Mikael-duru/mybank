import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";

const RightSideBar = ({ user, transactions, banks }: RightSideBarProps) => {
	return (
		<aside className="right-sidebar">
			<section className="flex flex-col pb-8">
				<div className="profile-banner" />

				<div className="profile">
					<div className="profile-img">
						<span className="text-5xl font-bold text-bankGradient">
							{user?.name[0]}
						</span>
					</div>

					<div className="profile-details">
						<h1 className="profile-name">{user?.name}</h1>
						<p className="profile-email">{user?.email}</p>
					</div>
				</div>
			</section>

			<section className="banks">
				<div className="flex w-full justify-between">
					<h2 className="header-2">My Banks</h2>
					<Link href="/" className="flex gap-2">
						<Plus className="size-5" />
						<h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
					</Link>
				</div>
				{banks?.length > 0 && (
					<div className="relative flex flex-col justify-center gap-5 flex-1 items-center">
						<div className="relative z-10 w-full pr-3">
							<BankCard
								key={banks[0].$id}
								account={banks[0]}
								userName={user?.name}
								showBalance={false}
							/>
						</div>
						{banks[1] && (
							<div className="absolute right-0 top-[17px] z-0 w-[95%]">
								<BankCard
									key={banks[1].$id}
									account={banks[1]}
									userName={user?.name}
									showBalance={false}
								/>
							</div>
						)}
					</div>
				)}
			</section>
		</aside>
	);
};

export default RightSideBar;
