import { logoutAccount } from "@/lib/actions/user.actions";
import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Footer = ({ type = "desktop" }: any) => {
	const router = useRouter();

	const handleLogout = async () => {
		const loggedOut = await logoutAccount();

		if (loggedOut) router.push("/sign-in");
	};

	return (
		<footer className="pb-4 sm:py-6 w-full max-w-[200px]">
			<Button
				onClick={handleLogout}
				className="text-black-2 w-full border-bankGradient hover:text-red-500 flex-1 hover:border-red-500"
				variant="outline"
			>
				<LogOut className="size-full mr-2" />{" "}
				<span className={`${type === "mobile" ? "" : "max-xl:hidden"}`}>
					Log Out
				</span>
			</Button>
		</footer>
	);
};

export default Footer;
