"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "./ui/button";

const CopyText = ({ title }: { title: string }) => {
	const [hasCopied, setHasCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(title);
		setHasCopied(true);

		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	};

	return (
		<Button
			data-state="closed"
			className="mt-3 flex max-w-[320px] gap-4"
			variant="secondary"
			onClick={copyToClipboard}
		>
			<p className="line-clamp-1 w-full max-w-full text-xs font-medium text-black-2">
				{title}
			</p>

			{!hasCopied ? <Copy size={24} /> : <Check size={24} />}
		</Button>
	);
};

export default CopyText;
