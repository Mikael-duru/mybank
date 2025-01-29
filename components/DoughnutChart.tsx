"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
	const accountNames = accounts.map((acct) => acct.name);
	const accountBalance = accounts.map((acct) => acct.currentBalance);

	// Function to dynamically generate green shades based on balance - Higher balance result in a brighter green (rgb(0, 255, 0)), and lower balances result in a darker green.
	const generateGreenShades = (balances: any) => {
		return balances.map((balance: any) => {
			// Normalize balance to a range (e.g., 0 to 255 for RGB values)
			const maxBalance = Math.max(...balances);
			const normalized = Math.min(balance / maxBalance, 1); // Ensure the value is between 0 and 1
			const greenValue = Math.floor(normalized * 255); // Scale to 0-255
			return `rgb(0, ${greenValue}, 0)`; // Return the color in RGB format
		});
	};

	const data = {
		datasets: [
			{
				label: "Banks",
				data: accountBalance,
				backgroundColor: generateGreenShades(accountBalance),
			},
		],
		labels: accountNames,
	};
	return (
		<Doughnut
			data={data}
			options={{
				cutout: "50%",
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
		/>
	);
};

export default DoughnutChart;
