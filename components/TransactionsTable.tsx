import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { StatusBadgeStyles } from "@/constants";
import {
	cn,
	formatAmount,
	formatDateTime,
	getTransactionStatus,
	removeSpecialCharacters,
} from "@/lib/utils";

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const styles = StatusBadgeStyles(status.toLocaleLowerCase());

	const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
		styles;

	return (
		<div
			className={cn("category-badge mx-auto", borderColor, chipBackgroundColor)}
		>
			<div className={cn("size-2 rounded-full", backgroundColor)} />
			<p className={cn("text-[12px] font-medium", textColor)}>{status}</p>
		</div>
	);
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
	return (
		<Table>
			<TableHeader className="bg-gray-100">
				<TableRow>
					<TableHead className="px-2 text-left">Transactions</TableHead>
					<TableHead className="px-2 text-center">Amount</TableHead>
					<TableHead className="px-2 text-center">Status</TableHead>
					<TableHead className="px-2 text-center">Date</TableHead>
					<TableHead className="px-2 text-center">Channel</TableHead>
					<TableHead className="px-2 text-center max-sm:hidden">
						Category
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions?.map((t: Transaction) => {
					const status = getTransactionStatus(new Date(t?.date));
					const amount = formatAmount(t?.amount);
					const isDebit = t?.type === "debit";
					const isCredit = t?.type === "credit";

					return (
						<TableRow
							key={t?.id}
							className={`${
								isDebit || amount[0] === "-" ? "bg-[#fffbfa]" : "bg-[#f6fef9]"
							} !over:bg-none !border-b-DEFAULT`}
						>
							<TableCell className="max-w-[246px] pl-2 pr-10">
								<div className="flex items-center gap-3">
									<h1 className="text-14 truncate font-semibold text-[#344054]">
										{removeSpecialCharacters(t?.name)}
									</h1>
								</div>
							</TableCell>

							<TableCell
								className={`px-2 font-semibold text-center ${
									isDebit || amount[0] === "-"
										? "text-[#f04438]"
										: "text-[#039855]"
								}`}
							>
								{isDebit ? `-${amount}` : isCredit ? amount : amount}
							</TableCell>

							<TableCell className="px-4 text-center">
								<StatusBadge status={status} />
							</TableCell>

							<TableCell className="px-4 text-center min-w-32">
								{formatDateTime(new Date(t?.date)).dateTime}
							</TableCell>

							<TableCell className="px-2 text-center">
								{t?.paymentChannel}
							</TableCell>

							<TableCell className="pl-4 pr-2 text-center font-medium capitalize min-w-24 max-sm:hidden">
								{t?.category}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TransactionsTable;
