"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppContext } from "../context/AppContext";
import { FinanceData } from "../assets/types/data";

export default function Transactions() {
	const { data } = useAppContext() as {
		data: FinanceData | null;
	};

	return (
		<div
			className={`flex-1 h-full px-3 md:px-5 pt-7 lg:px-10 lg:pt-10 pb-24 overflow-y-scroll transition-all duration-500 ease-in-out bg-[#121212] w-full`}>
			<h1 className="text-[1.75rem] xl:text-3xl 2xl:text-[2rem] font-bold text-[#e0e0e0]">
				Transactions
			</h1>
			<div className="w-full h-auto bg-[#232323] rounded-2xl mt-10 lg:mt-12 py-6 px-4 lg:p-8 flex flex-col">
				<div className="w-full hidden capitalize lg:flex items-center text-[13px] font-semibold text-[#b0b0b0] border-b border-[#4444448a] pb-3">
					<p className="w-2/4">Description</p>
					<p className="w-1/4">Category</p>
					<p className="w-1/4">Transaction Date</p>
					<p className="w-1/6">Amount</p>
				</div>
				<>
					{data?.transactions.length === 0 ? (
						<p className="text-center py-5 text-[#b0b0b0] text-[14px] font-semibold">
							No transactions found
						</p>
					) : (
						data?.transactions.map((transaction, index) => {
							return (
								<div
									className={`w-full flex items-center justify-between lg:justify-start font-medium overflow-hidden ${
										index === data?.transactions.length - 1
											? ""
											: "border-b border-[#4444448a]"
									} py-5`}
									key={index}>
									<div className="flex items-center lg:w-2/4 space-x-2">
										<Icon
											icon={transaction.icon ?? ""}
											className="text-3xl text-[#b0b0b0]"
										/>
										<div className="leading-tight capitalize">
											<p className="text-sm font-semibold text-[#e0e0e0]">
												{transaction.description}
											</p>
										</div>
									</div>
									<p className="w-1/4 hidden lg:block capitalize font-normal text-[#b0b0b0] text-[13px] ">
										{transaction.category}
									</p>

									<p className="w-1/4 font-normal hidden lg:block capitalize text-[#b0b0b0] text-[13px] ">
										{transaction.date}
									</p>

									<div className=" lg:w-1/6">
										<p
											className={` font-bold ${
												transaction.category === "income"
													? "text-[#277c78]"
													: "text-[#c94736]"
											}  text-[14px] lg:text-[15px]`}>
											{transaction.category === "income" ? "+ " : "-"} $
											{transaction.amount?.toLocaleString()}
										</p>
										<p className="w-full lg:w-1/4 lg:hidden font-normal text-[#b0b0b0] text-[11px] ">
											{transaction.date}
										</p>
									</div>
								</div>
							);
						})
					)}
				</>
			</div>
		</div>
	);
}
