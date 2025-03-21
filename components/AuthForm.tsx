"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { authUser, registerUser } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const formSchema = authFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			address1: "",
			city: "",
			state: "",
			postalCode: "",
			dateOfBirth: "",
			ssn: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);

			// Register user
			if (type === "sign-up") {
				// ! = means it will be there for typescript eslint
				const userData = {
					email: data.email,
					password: data.password,
					firstName: data.firstName!,
					lastName: data.lastName!,
					address1: data.address1!,
					city: data.city!,
					state: data.state!,
					postalCode: data.postalCode!,
					dateOfBirth: data.dateOfBirth!,
					ssn: data.ssn!,
				};

				const newUser = await registerUser(userData);
				setUser(newUser);
			}

			// Authenticate user
			if (type === "sign-in") {
				const response = await authUser({
					email: data.email,
					password: data.password,
				});

				if (response) {
					router.push("/");
				} else {
					toast.error(
						"Invalid credentials. Please check the email and password."
					);
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="flex cursor-pointer items-center gap-2">
					<Image
						src="/icons/logo.png"
						width={28}
						height={28}
						alt="myBank logo"
					/>
					<h1 className="text-20 font-ibm-plex-serif font-bold text-[#1B8B00]">
						MyBank
					</h1>
				</Link>

				<div className="flex flex-col gap-1 md:gap-3 text-center pt-5">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
					</h1>
					<p className="text-16 font-normal text-gray-600">
						{user
							? "Link your bank account to get started."
							: type === "sign-in"
							? "Please enter your credentials."
							: "Please enter your details."}
					</p>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4">
					{/* Plaid link */}
					<PlaidLink user={user} variant="primary" />
				</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{/* SIGN UP */}
							{type === "sign-up" && (
								<>
									<div className="flex gap-4">
										{/* First name */}
										<CustomInput
											control={form.control}
											name="firstName"
											label="First Name"
											placeholder="Enter your first name"
										/>

										{/* Last name */}
										<CustomInput
											control={form.control}
											name="lastName"
											label="last Name"
											placeholder="Enter your last name"
										/>
									</div>

									{/* Address */}
									<CustomInput
										control={form.control}
										name="address1"
										label="Address"
										placeholder="Enter your address"
									/>

									{/* City */}
									<CustomInput
										control={form.control}
										name="city"
										label="City"
										placeholder="Enter your city"
									/>

									<div className="flex gap-4">
										{/* State */}
										<CustomInput
											control={form.control}
											name="state"
											label="State"
											placeholder="Ex: NY"
										/>

										{/* Postal code */}
										<CustomInput
											control={form.control}
											name="postalCode"
											label="Postal Code"
											placeholder="Ex: 100111"
										/>
									</div>

									<div className="flex gap-4">
										{/* date of birth */}
										<CustomInput
											control={form.control}
											name="dateOfBirth"
											label="Date of Birth"
											placeholder="yyyy-mm-dd"
										/>

										{/* SSN - will be changed to NIN */}
										<CustomInput
											control={form.control}
											name="ssn"
											label="SSN"
											placeholder="Ex: 1234"
										/>
									</div>
								</>
							)}

							{/* SIGN IN */}
							{/* email field */}
							<CustomInput
								control={form.control}
								name="email"
								label="Email"
								placeholder="Enter your email"
							/>

							{/* Password field */}
							<CustomInput
								control={form.control}
								name="password"
								label="Password"
								placeholder="Enter your password"
							/>

							<div className="w-full">
								<Button
									type="submit"
									className="form-btn w-full"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader2 size={20} className="animate-spin" />{" "}
											&nbsp;Loading...
										</>
									) : type === "sign-in" ? (
										"Sign In"
									) : (
										"Sign Up"
									)}
								</Button>
							</div>
						</form>
					</Form>

					<footer className="flex justify-center gap-1">
						<p className="text-14 font-normal text-gray-600">
							{type === "sign-in"
								? "Don't have an account?"
								: "Already have an account?"}
						</p>
						<Link
							href={type === "sign-in" ? "/sign-up" : "/sign-in"}
							className="form-link"
						>
							{type === "sign-in" ? "Sign Up" : "Sign In"}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
};

export default AuthForm;
