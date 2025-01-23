"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { LeftSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavBar = ({ user }: MobileNavProps) => {
	const pathname = usePathname();
	return (
		<section className="w-full max-w-[264px]">
			<Sheet>
				<SheetTrigger>
					<Menu className="cursor-pointer size-[30px]" />
				</SheetTrigger>
				<SheetContent side="left" className="border-none bg-white">
					<Link
						href="/"
						className="flex cursor-pointer items-center gap-2 px-1"
					>
						<Image
							src="/icons/logo.png"
							width={300}
							height={300}
							alt="myBank logo"
							className="size-[34px]"
						/>
						<h1 className="text-24 font-ibm-plex-serif font-bold text-[#1B8B00]">
							MyBank
						</h1>
					</Link>

					<div className="mobilenav-sheet">
						<SheetClose asChild>
							<nav className="flex h-full flex-col gap-6 pt-16 text-white">
								{LeftSideBarLinks.map((item) => {
									const isActive =
										pathname === item.route ||
										pathname.startsWith(`${item.route}/`);

									return (
										<SheetClose asChild key={item.route}>
											<Link
												href={item.route}
												key={item.label}
												className={cn("mobilenav-sheet_close w-full", {
													"bg-bank-gradient": isActive,
												})}
											>
												<Image
													src={item.imgURL}
													alt={item.label}
													width={20}
													height={20}
													className={cn({
														"brightness-[3] invert-0": isActive,
													})}
												/>
												<p
													className={cn(
														"text-16 font-inter font-semibold text-black-2",
														{
															"text-white": isActive,
														}
													)}
												>
													{item.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
							</nav>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNavBar;
