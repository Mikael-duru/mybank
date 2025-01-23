"use client";

import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
	return (
		<div className="w-full">
			{/* change prefix to naira later */}
			<CountUp end={amount} decimal="." decimals={2} prefix="$ " />
		</div>
	);
};

export default AnimatedCounter;
