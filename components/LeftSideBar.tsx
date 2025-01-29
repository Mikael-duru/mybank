"use client";

import { LeftSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const LeftSideBar = ({ user }: LeftSideBarProps) => {
	const pathname = usePathname();
	return (
		<section className="left-sidebar shrink-0">
			<nav className="flex flex-col gap-4">
				<Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
					<Image
						src="/icons/logo.png"
						width={300}
						height={300}
						alt="myBank logo"
						className="size-[30px] max-xl:size-10"
					/>
					<h1 className="left-sidebar-logo">MyBank</h1>
				</Link>

				{LeftSideBarLinks.map((item) => {
					const isActive =
						pathname === item.route || pathname.startsWith(`${item.route}/`);

					return (
						<Link
							href={item.route}
							key={item.label}
							className={cn("left-sidebar-link", {
								"bg-bank-gradient": isActive,
							})}
						>
							<div className="relative size-6">
								<Image
									src={item.imgURL}
									alt={item.label}
									fill
									className={cn({ "brightness-[3] invert-0": isActive })}
								/>
							</div>
							<p
								className={cn("left-sidebar-label", {
									"!text-white": isActive,
								})}
							>
								{item.label}
							</p>
						</Link>
					);
				})}

				<PlaidLink user={user} />
			</nav>

			<Footer />
		</section>
	);
};

export default LeftSideBar;
