import Image from "next/image";
import Link from "next/link";
import React from "react";
import CopyText from "./Copy";
import { formatAmount } from "@/lib/utils";

const BankCard = ({ account, userName, showBalance }: CreditCardProps) => {
	return (
		<div className="flex flex-col">
			<Link
				href={`/transaction-history/?id=${account?.appwriteItemId}`}
				className="bank-card"
			>
				<div className="bank-card_content">
					<div className="text-right">
						<h1 className="text-14 font-semibold text-white capitalize">
							{account?.name}
						</h1>
						<p className="font-ibm-plex-serif font-black text-white">
							{formatAmount(account.currentBalance)}
						</p>
					</div>

					<article className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<Image
								src="/icons/atm-card-chip.png"
								width={40}
								height={40}
								alt="card chip"
							/>
							<Image
								src="/icons/Paypass.svg"
								width={20}
								height={24}
								alt="pay"
							/>
						</div>

						<p className="text-14 sm:text-16 font-ibm-plex-serif font-semibold tracking-[1.1px] text-white py-2 text-center">
							●●●●&nbsp; ●●●●&nbsp; ●●●●&nbsp; {account?.mask}
						</p>

						<div className="flex justify-between items-center">
							<h1 className="text-14 font-semibold text-white">{userName}</h1>
							<h2 className="text-12 font-semibold text-white flex items-center gap-1.5">
								<span className="inline-block w-8 text-[11px] leading-[12px] tracking-wider">
									VALID THRU
								</span>
								●● / ●●
							</h2>
						</div>
					</article>
				</div>
			</Link>

			{showBalance && <CopyText title={account?.shareableId} />}
		</div>
	);
};

export default BankCard;
