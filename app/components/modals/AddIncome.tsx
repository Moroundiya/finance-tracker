"use client";

import { InputGroup, Label, TextField, Button, Modal } from "@heroui/react";
import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { FinanceData } from "@/app/assets/types/data";

export function AddIncome({
	showIncomeModal,
	setShowIncomeModal,
}: {
	showIncomeModal: boolean;
	setShowIncomeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { data, setData } = useAppContext() as {
		data: FinanceData | null;
		setData: React.Dispatch<React.SetStateAction<FinanceData | null>>;
	};
	const [amount, setAmount] = useState<boolean>(false);
	const handleAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const amountValue = parseFloat(formData.get("amount") as string);
		if (!amountValue || amountValue <= 0) {
			setAmount(true);
			return;
		}
		setData(
			data
				? {
						...data,
						transactions: [
							{
								icon: "hugeicons:money-add-01",
								date: new Date().toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								}),
								description: "Added funds to Income",
								category: "income",
								amount: amountValue,
							},
							...data.transactions,
						],
						balance: {
							...data.balance,
							// expenses: data.balance.expenses,
							income: data.balance.income + amountValue,
							current:
								data.balance.income - data.balance.expenses + amountValue,
						},
					}
				: null,
		);
		// alert(`Income of $${amountValue.toFixed(2)} added successfully!`);
		setShowIncomeModal(false);
	};
	return (
		<Modal
			onOpenChange={setShowIncomeModal}
			isOpen={showIncomeModal}>
			<Modal.Backdrop
				variant="opaque"
				isDismissable={false}
				className="h-dvh">
				<Modal.Container
					size="md"
					placement="center">
					<Modal.Dialog>
						<Modal.CloseTrigger />
						<Modal.Body className="text-black flex flex-col justify-center items-center py-5 px-2 w-full">
							<form
								onSubmit={handleAddIncome}
								className="w-full">
								<div className="w-full">
									<TextField
										className="w-full ring-0 outline-none"
										defaultValue=""
										name="amount">
										<Label className="text-muted text-sm mb-2">
											Amount <span className="text-orange-500">*</span>
										</Label>
										<InputGroup className="border border-[#e0e0e0]">
											<InputGroup.Prefix>$</InputGroup.Prefix>
											<InputGroup.Input
												className="w-full h-12"
												required
												type="number"
												max={10000}
											/>
											<InputGroup.Suffix>USD</InputGroup.Suffix>
										</InputGroup>
									</TextField>
									{amount && (
										<p className="text-red-500 text-[11px] mt-1.5">
											Please enter a valid amount ($1 - $10,000)
										</p>
									)}
								</div>

								<div className="w-full flex justify-center mt-5">
									<Button
										className="w-fit bg-[#09352b]"
										type="submit">
										<span>Add Income</span>
									</Button>
								</div>
							</form>
						</Modal.Body>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
