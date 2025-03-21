"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
	PlaidLinkOnSuccess,
	PlaidLinkOptions,
	usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
	createLinkToken,
	exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
	const [token, setToken] = useState("");
	const router = useRouter();

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user);
			setToken(data?.linkToken);
		};

		getLinkToken();
	}, [user]);

	// remove the "PlaidLinkOnSuccess" part if there's error from here.
	const onSuccess = useCallback<PlaidLinkOnSuccess>(
		async (public_token: string) => {
			await exchangePublicToken({
				publicToken: public_token,
				user,
			});

			router.push("/");
		},
		[user]
	);

	const config: PlaidLinkOptions = {
		token,
		onSuccess,
	};

	const { open, ready } = usePlaidLink(config);

	return (
		<>
			{variant === "primary" ? (
				<Button
					className="plaidlink-primary"
					onClick={() => open()}
					disabled={!ready}
				>
					Connect bank
				</Button>
			) : variant === "ghost" ? (
				<Button
					onClick={() => open()}
					className="plaidlink-ghost"
					variant="ghost"
				>
					<Image
						src="/icons/connect-bank.svg"
						width={24}
						height={24}
						alt="connect bank"
					/>
					<p className="text-[16px] font-semibold text-black-2">Connect Bank</p>
				</Button>
			) : (
				<Button onClick={() => open()} className="plaidlink-default">
					<Image
						src="/icons/connect-bank.svg"
						width={24}
						height={24}
						alt="connect bank"
					/>
					<p className="text-[16px] font-semibold text-black-2 max-xl:hidden">
						Connect Bank
					</p>
				</Button>
			)}
		</>
	);
};

export default PlaidLink;
