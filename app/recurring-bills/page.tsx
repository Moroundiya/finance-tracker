"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppContext } from "../context/AppContext";
import { FinanceData } from "../assets/types/data";

export default function Bills() {
	const { data, collapseNavbar } = useAppContext() as {
		data: FinanceData | null;
		collapseNavbar: boolean;
	};
	const [showDetails, setShowDetails] = useState(false);
	const [freeze, setFreeze] = useState(false);

	return (
		<div
			className={`flex-1 h-full px-3 md:px-5 pt-7 lg:px-10 lg:pt-10 pb-24 overflow-auto transition-all duration-500 ease-in-out bg-[#121212] w-full`}>
			<h1 className="text-[1.75rem] xl:text-3xl 2xl:text-[2rem] font-bold text-[#e0e0e0]">
				Recurring Bills
			</h1>
			<div className="mt-10 lg:mt-12 space-y-6">
				<div className="w-full space-y-6 lg:space-y-0 lg:space-x-6 lg:flex">
					<div className="w-full space-y-6 lg:w-3/6 xl:w-3/5 2xl:w-2/4">
						<div className="text-[#e0e0e0] py-6 px-3 lg:p-6 card-bg rounded-2xl">
							<div className="md:flex md:space-x-8 lg:space-x-0 lg:block items-center justify-center w-full">
								<div className="md:w-1/2 lg:w-full">
									<p className="lg:font-semibold">Virtual Card</p>

									<div className="w-full flex justify-center items-center">
										<div className="w-full lg:w-11/12 h-50 lg:h-56.25 bg-gradient-to-tr-dark rounded-2xl my-5 shadow-md py-6 px-5 lg:p-7 flex flex-col justify-between">
											<div className="flex justify-between items-center text-[#e0e0e0]">
												<p className="text-sm lg:text-md">Debit</p>
												<Icon
													icon="brandico:visa"
													className="text-4xl lg:text-5xl "
												/>
											</div>

											<div className="text-[#e0e0e0] flex justify-between items-center">
												<Icon
													icon="flat-color-icons:sim-card-chip"
													className="text-4xl lg:text-5xl"
												/>
												<div className="">
													<p className="font-thin text-sm uppercase text-right">
														USERNAME
													</p>
													<p className="font-bold text-md lg:text-lg flex justify-center items-center space-x-2">
														<span>{showDetails ? "4166" : "****"}</span>
														<span>{showDetails ? "3852" : "****"}</span>
														<span>{showDetails ? "0781" : "****"}</span>
														<span>3921</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="md:w-1/2 lg:w-full text-[14px] mt-3">
									<div className="space-y-3">
										<p className="flex justify-between items-center text-[#e0e0e0]">
											<span>Status</span>
											<span
												className={`${
													freeze ? "bg-red-700" : "bg-green-700"
												} px-3 py-1 text-[13px] text-white rounded-md`}>
												{freeze ? "Frozen" : "Active"}
											</span>
										</p>
										<p className="flex justify-between items-center text-[#e0e0e0]">
											<span>Card Number</span>
											<span>
												{showDetails
													? "4166 3852 0781 3921"
													: "***********3921"}
											</span>
										</p>
										<p className="flex justify-between items-center text-[#e0e0e0]">
											<span>Expire Date</span>
											<span>{showDetails ? "04/28" : "*****"}</span>
										</p>
										<p className="flex justify-between items-center text-[#e0e0e0]">
											<span>CVV</span>
											<span>{showDetails ? 795 : "***"}</span>
										</p>
										<p className="flex justify-between items-center text-[#e0e0e0]">
											<span>PIN</span>
											<span>{showDetails ? 1234 : "****"}</span>
										</p>
										<p className="flex justify-between items-center text-[#e0e0e0]">
											<span>Spending Limit</span>
											<span>$2,190.56</span>
										</p>
									</div>
									<progress
										min={0}
										max={100}
										value={65}
										className="w-full h-1 rounded-xl overflow-hidden appearance-none"></progress>

									<div className="flex justify-between items-center mt-6 mb-3 lg:mt-8 lg:mb-4 space-x-8">
										<button
											className="w-1/2 rounded-md border outline-none border-[#363636] py-2.5 lg:py-3 hover:bg-[#363636] font-semibold transition-all duration-300 ease-in-out"
											onClick={() => setShowDetails(!showDetails)}>
											{showDetails ? "Hide Details" : "Show Details"}
										</button>
										<button
											className="w-1/2 rounded-md border outline-none border-[#363636] py-2.5 lg:py-3 hover:bg-[#363636] hover:text-white font-semibold transition-all duration-300 ease-in-out"
											onClick={() => setFreeze(!freeze)}>
											{freeze ? "Unfreeze Card" : "Freeze Card"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full space-y-6 lg:w-3/6 xl:w-3/5 2xl:w-4/6">
						<div className="text-[#201f24] py-4 px-2.5 md:py-6 md:px-5 lg:p-6 2xl:p-8 bg-[#232323] rounded-2xl">
							<div className="w-full hidden lg:flex items-center text-[13px] font-semibold text-[#b0b0b0] border-b border-[#4444448a] pb-3">
								<p className="w-3/4">Bill Title</p>
								<p className="w-2/5 text-center">Due Date</p>
								<p className="w-1/6 2xl:w-2/6 text-center xl:text-right 2xl:text-center">
									Amount
								</p>
							</div>

							<div>
								{data?.transactions
									?.filter((t) => t.category !== "income")
									?.slice(0, 5)
									.map((transaction, index) => (
										<div
											className={`w-full flex items-center justify-between lg:justify-start font-medium ${
												index === transaction.length - 1
													? ""
													: "border-b border-[#4444448a]"
											} py-5`}
											key={index}>
											<div className="flex items-center w-4/6 lg:w-3/4 space-x-2">
												<Icon
													icon="mdi:recurring-payment"
													className="text-[#e0e0e0] text-2xl"
												/>
												<div className="leading-tight ">
													<p className="text-sm font-semibold text-[#e0e0e0]">
														{transaction.description}
													</p>
													<p className="w-full lg:w-1/4 lg:hidden font-normal text-[#b0b0b0] text-[13px] ">
														{transaction.category}
													</p>
												</div>
											</div>

											<div className="w-2/5 font-normal hidden lg:block text-[#b0b0b0] text-[13px] ">
												<p className="text-green-700 font-normal text-[12px] flex justify-center items-center space-x-1">
													<span>Monthly 1st</span>
													<Icon
														icon="ep:success-filled"
														className="text-base"
													/>
												</p>
											</div>

											<div className="xl:w-1/6 2xl:w-2/6">
												<p
													className={` font-bold ${
														transaction.category === "income"
															? "text-[#277c78]"
															: "text-[#c94736]"
													}  text-[13px] lg:text-center xl:text-right 2xl:text-center`}>
													{transaction.category === "income" ? "+ " : "-"} $
													{Math.abs(transaction.amount ?? 0).toLocaleString()}
												</p>
												<p className="text-green-700 lg:hidden font-normal text-[11px] lg:text-[12px] flex items-center space-x-1">
													<span>Monthly 1st</span>
													<Icon
														icon="ep:success-filled"
														className="text-sm lg:text-base"
													/>
												</p>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
