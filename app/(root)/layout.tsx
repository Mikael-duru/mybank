import LeftSideBar from "@/components/LeftSideBar";
import MobileNavBar from "@/components/MobileNavBar";

import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedIn = {
		firstName: "Mikael",
		lastName: "Duru",
	};

	return (
		<main className="flex h-screen w-full font-inter">
			<LeftSideBar user={loggedIn} />
			<div className="flex size-full flex-col">
				<div className="root-layout">
					<Image
						src="/icons/logo.png"
						alt="myBank logo"
						width={32}
						height={32}
					/>
					<div>
						<MobileNavBar user={loggedIn} />
					</div>
				</div>
				{children}
			</div>
		</main>
	);
}
