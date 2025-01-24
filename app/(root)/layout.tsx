import LeftSideBar from "@/components/LeftSideBar";
import MobileNavBar from "@/components/MobileNavBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedInUser = await getLoggedInUser();

	if (!loggedInUser) redirect("/sign-in");

	return (
		<main className="flex h-screen w-full font-inter">
			<LeftSideBar user={loggedInUser} />
			<div className="flex size-full flex-col font-inter">
				<div className="root-layout">
					<Link href="/" className="flex cursor-pointer items-center gap-1.5">
						<Image
							src="/icons/logo.png"
							width={300}
							height={300}
							alt="myBank logo"
							className="size-[28px]"
						/>
						<h1 className="text-xl font-ibm-plex-serif font-bold text-[#1B8B00]">
							MyBank
						</h1>
					</Link>
					<div>
						<MobileNavBar user={loggedInUser} />
					</div>
				</div>
				{children}
			</div>
		</main>
	);
}
