export const LeftSideBarLinks = [
	{
		imgURL: "/icons/home.svg",
		route: "/",
		label: "Home",
	},
	{
		imgURL: "/icons/dollar-circle.svg",
		route: "/my-banks",
		label: "My Banks",
	},
	{
		imgURL: "/icons/transaction.svg",
		route: "/transaction-history",
		label: "Transactions",
	},
	{
		imgURL: "/icons/money-send.svg",
		route: "/payment-transfer",
		label: "Transfer Funds",
	},
];

export const topCategoryStyles = {
	"Food and Drink": {
		bg: "bg-blue-25",
		circleBg: "bg-blue-100",
		text: {
			main: "text-blue-900",
			count: "text-blue-700",
		},
		progress: {
			bg: "bg-blue-100",
			indicator: "bg-blue-700",
		},
		icon: "/icons/monitor.svg",
	},
	Travel: {
		bg: "bg-success-25",
		circleBg: "bg-success-100",
		text: {
			main: "text-success-900",
			count: "text-success-700",
		},
		progress: {
			bg: "bg-success-100",
			indicator: "bg-success-700",
		},
		icon: "/icons/coins.svg",
	},
	default: {
		bg: "bg-pink-25",
		circleBg: "bg-pink-100",
		text: {
			main: "text-pink-900",
			count: "text-pink-700",
		},
		progress: {
			bg: "bg-pink-100",
			indicator: "bg-pink-700",
		},
		icon: "/icons/shopping-bag.svg",
	},
};

export const StatusBadgeStyles = (status: string) => {
	const styles = {
		borderColor: "",
		backgroundColor: "",
		textColor: "",
		chipBackgroundColor: "",
	};

	switch (status) {
		case "processing":
			styles.borderColor = "border-[#F2F4F7]";
			styles.backgroundColor = "bg-gray-500";
			styles.textColor = "text-[#344054]";
			styles.chipBackgroundColor = "bg-[#F2F4F7]";
			break;
		case "success":
			styles.borderColor = "border-[#12B76A]";
			styles.backgroundColor = "bg-[#12B76A]";
			styles.textColor = "text-[#027A48]";
			styles.chipBackgroundColor = "bg-[#ECFDF3]";
			break;
		case "declined":
			styles.borderColor = "border-[#FEF3F2]";
			styles.backgroundColor = "bg-[#FEF3F2]";
			styles.textColor = "text-[#B42318]";
			styles.chipBackgroundColor = "bg-[#F04438]";
			break;
		default:
			break;
	}

	return styles;
};
