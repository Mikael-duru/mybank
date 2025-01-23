import Image from "next/image";
import Link from "next/link";
import React from "react";

const BankCard = ({
	key,
	account,
	userName,
	showBalance = true,
}: CreditCardProps) => {
	return (
		<div className="flex flex-col">
			<Link href="/" className="bank-card">
				<div className="bank-card_content">
					<div className="flex justify-between">
						<h1 className="text-16 font-semibold text-white capitalize">
							{account.type || "debit"}
						</h1>
						<Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
					</div>

					<article className="flex flex-col gap-2">
						<Image
							src="/icons/atm-card-chip.png"
							width={40}
							height={40}
							alt="card chip"
						/>

						<div className="flex flex-col justify-between items-center -mb-3.5">
							<p className="text-14 font-semibold tracking-[1.1px] text-white">
								●●●● ●●●● ●●●● <span className="text-16">1234</span>
							</p>
							<h2 className="text-12 font-semibold text-white flex items-center gap-1">
								<span className="inline-block w-8 text-[11px] leading-[12px] tracking-wider">
									VALID THRU
								</span>
								●● / ●●
							</h2>
						</div>

						<div className="flex justify-between items-baseline">
							<h1 className="text-14 font-semibold text-white">{userName}</h1>
							<Image
								src="/icons/mastercard.png"
								width={45}
								height={32}
								alt="mastercard"
							/>
						</div>
					</article>
				</div>
			</Link>
		</div>
	);
};

export default BankCard;
