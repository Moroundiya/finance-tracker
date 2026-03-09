"use client";

import { useAppContext } from "../context/AppContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Separator } from "@heroui/react";
import { AddIncome } from "../components/modals/AddIncome";
import { useState } from "react";
import { AddExpense } from "../components/modals/AddExpense";
import { FinanceData } from "../assets/types/data";
import Chart from "../components/Chart";

export default function Overview() {
	const { data } = useAppContext() as {
		data: FinanceData | null;
	};

	const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);
	const [showExpenseModal, setShowExpenseModal] = useState<boolean>(false);

	return (
		<div
			className={`h-full px-3 md:px-5 pt-7 lg:px-10 lg:pt-10 pb-24 overflow-auto bg-[#121212] w-full relative`}>
			<AddIncome
				showIncomeModal={showIncomeModal}
				setShowIncomeModal={setShowIncomeModal}
			/>
			<AddExpense
				showExpenseModal={showExpenseModal}
				setShowExpenseModal={setShowExpenseModal}
			/>
			<div className="flex justify-between items-center">
				<h1 className="text-[1.75rem] xl:text-3xl 2xl:text-[2rem] font-bold text-[#e0e0e0]">
					Overview
				</h1>
				<p className="font-semibold capitalize text-[#b0b0b0] text-[12px] lg:text-sm 2xl:text-base">
					Welcome 👋
				</p>
			</div>
			<div className="mt-10 lg:mt-12 space-y-6">
				<div className="w-full space-y-2.5 lg:space-y-0 lg:space-x-6 xl:space-x-3 2xl:space-x-6 lg:flex lg:justify-between lg:items-center">
					<div className="bg-[#268077] lg:w-1/3 rounded-2xl py-6 px-4 lg:p-6 shadow text-[#f8f4f0] flex items-center space-x-2.5 lg:space-x-3 dark:bg-[#268077] dark:text-white">
						<div>
							<Icon
								icon="tdesign:money-filled"
								className="text-[2.8rem] lg:text-5xl"
							/>
						</div>
						<Separator
							orientation="vertical"
							className="w-[0.5px] h-12 bg-[#2bdfcd2e]"
						/>
						<div className="lg:space-y-1">
							<p className="text-sm text-[#e0e0e0]">Current Balance</p>
							<p className="font-bold lg:font-semibold text-[2rem] lg:text-4xl">
								${data?.balance?.current?.toLocaleString()}
							</p>
						</div>
					</div>

					<div className="text-[#e0e0e0] relative bg-[#232323] lg:w-1/3 rounded-2xl py-6 px-4 lg:p-6 flex items-center shadow space-x-2.5 lg:space-x-3 dark:bg-[#232323] dark:text-white">
						<div
							className="font-semibold text-xs absolute top-2 right-0 cursor-pointer flex justify-center items-center px-4 py-2 lg:px-2 lg:py-1 rounded-lg bg-white text-black"
							onClick={() => setShowIncomeModal(true)}>
							<Icon icon="ooui:add" />
							<span>Add Income</span>
						</div>

						<div>
							<Icon
								icon="game-icons:receive-money"
								className="text-[2.8rem] lg:text-5xl"
							/>
						</div>
						<Separator
							orientation="vertical"
							className="w-[0.5px] h-12 bg-[#4444445c]"
						/>
						<div className="lg:space-y-1">
							<p className="text-sm">Income</p>
							<p className="font-bold lg:font-semibold text-[2rem] lg:text-4xl">
								${data?.balance?.income?.toLocaleString()}
							</p>
						</div>
					</div>
					<div className="text-[#e0e0e0] bg-[#232323] relative lg:w-1/3 rounded-2xl shadow py-6 px-4 lg:p-6 flex items-center space-x-2.5 lg:space-x-3 dark:bg-[#232323] dark:text-white">
						<div
							className="font-semibold text-xs absolute top-2 right-0 cursor-pointer flex justify-center items-center px-4 py-2 lg:px-2 lg:py-1 rounded-lg bg-white text-black"
							onClick={() => setShowExpenseModal(true)}>
							<Icon icon="ooui:add" />
							<span>Add Expense</span>
						</div>

						<div>
							<Icon
								icon="game-icons:pay-money"
								className="text-[2.8rem] lg:text-5xl"
							/>
						</div>
						<Separator
							orientation="vertical"
							className="w-[0.5px] h-12 bg-[#4444445c]"
						/>
						<div className="lg:space-y-1">
							<p className="text-sm">Expenses</p>
							<p className="font-bold lg:font-semibold text-[2rem] lg:text-4xl]">
								${data?.balance?.expenses?.toLocaleString()}
							</p>
						</div>
					</div>
				</div>
				<div className="w-full space-y-6 lg:space-y-0 lg:space-x-6 lg:flex">
					<div className="w-full space-y-6 xl:w-3/5">
						<div className="text-[#e0e0e0] py-6 px-3.5 md:px-5 lg:p-6 bg-[#232323] rounded-2xl">
							<p className="flex justify-between items-center">
								<span className="text-xl font-semibold">Transactions</span>
								<Link
									href="/transactions"
									className="text-[14px] flex justify-center items-center space-x-1 font-normal dark:text-[#b0b0b0]">
									<span>View All</span>
									<Icon
										icon="mynaui:arrow-right-solid"
										className="text-lg"
									/>
								</Link>
							</p>
							<div className="mt-4 lg:mt-2">
								{data?.transactions.length === 0 ? (
									<p className="text-center py-10 text-[#b0b0b0] text-[14px] font-semibold">
										No transactions found
									</p>
								) : (
									data?.transactions.slice(0, 5).map((transaction, index) => (
										<div
											key={index}
											className={`flex items-center justify-between ${
												index === data?.transactions.length - 1
													? ""
													: "border-b border-[#444444]"
											} py-4`}>
											<div className="flex items-center space-x-2 lg:space-x-3">
												<Icon
													icon={transaction.icon ?? ""}
													className="text-3xl text-[#b0b0b0]"
												/>
												<p className="text-sm font-semibold text-[#e0e0e0] capitalize">
													{transaction.description}
												</p>
											</div>
											<div className="text-[12px] md:text-[13px] lg:text-sm lg:space-y-1">
												<p
													className={`font-bold ${
														transaction.category === "income"
															? "text-[#277c78]"
															: "text-[#c94736]"
													}`}>
													{transaction.category === "income" ? "+" : "-"}$
													{transaction.amount?.toLocaleString()}
												</p>
												<p className="font-normal text-[#696868] dark:text-[#b0b0b0]">
													{transaction.date}
												</p>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
					<div className="w-full space-y-6 xl:w-2/5">
						<div className="text-[#e0e0e0] py-6 px-3.5 md:px-5 lg:p-6 bg-[#232323] rounded-2xl">
							<p className="flex justify-between items-center">
								<span className="text-xl font-semibold dark:text-[#e0e0e0]">
									Budgets
								</span>
							</p>
							<div className="mt-2">
								<div className="md:flex lg:block items-center justify-center w-full">
									<div className="md:w-1/2 lg:w-full">
										<Chart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
