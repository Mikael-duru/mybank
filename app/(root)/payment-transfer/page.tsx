import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Transfer = async () => {
	const loggedInUser = await getLoggedInUser();

	const accounts = await getAccounts({
		userId: loggedInUser.$id,
	});

	if (!accounts) return;

	const accountsData = accounts?.data;

	return (
		<section className="payment-transfer">
			<HeaderBox
				title="Payment Transfer"
				subtext="Please provide specific details or notes related to the payment transfer"
			/>

			<div className="size-full pt-5">
				<PaymentTransferForm accounts={accountsData} />
			</div>
		</section>
	);
};

export default Transfer;
