"use client";

import {
	InputGroup,
	Label,
	TextField,
	Button,
	Modal,
	TextArea,
	ListBox,
	Select,
} from "@heroui/react";
import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { FinanceData } from "@/app/assets/types/data";

export function AddExpense({
	showExpenseModal,
	setShowExpenseModal,
}: {
	showExpenseModal: boolean;
	setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { data, setData } = useAppContext() as {
		data: FinanceData | null;
		setData: React.Dispatch<React.SetStateAction<FinanceData | null>>;
	};
	const [category, setCategory] = useState<string>("");
	const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const amountValue = parseFloat(formData.get("price") as string);
		const descriptionValue = formData.get("description") as string;
		if (!amountValue || amountValue <= 0 || amountValue > 100) {
			alert("Please enter a valid amount ($1 - $100).");
			return;
		}

		if ((data?.balance?.current ?? 0) < amountValue) {
			alert(
				`Insufficient balance. Top up your income by at least $${amountValue - (data?.balance?.current || 0)} to add this expense.`,
			);
			return;
		}
		setData(
			data
				? {
						...data,
						transactions: [
							{
								icon: "majesticons:money-minus-line",
								date: new Date().toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								}),
								description: descriptionValue,
								category: category,
								amount: amountValue,
							},
							...data.transactions,
						],
						balance: {
							...data.balance,
							expenses: data.balance.expenses + amountValue,
							income: data.balance.income - data.balance.expenses - amountValue,
							current:
								data.balance.income - data.balance.expenses - amountValue,
						},
					}
				: null,
		);

		console.log("data is", {
			amount: amountValue,
			category: category,
			description: descriptionValue,
		});
		setShowExpenseModal(false);
	};

	return (
		<Modal
			onOpenChange={setShowExpenseModal}
			isOpen={showExpenseModal}>
			<Modal.Backdrop
				variant="opaque"
				isDismissable={false}
				className="h-dvh">
				<Modal.Container
					size="md"
					placement="center">
					<Modal.Dialog>
						<Modal.CloseTrigger />
						<Modal.Body className="text-black pt-5 xl:pt-16 2xl:pt-3 h-full flex flex-col justify-center items-center py-5 px-2 w-full space-y-4">
							<form
								onSubmit={handleAddExpense}
								className="w-full flex flex-col space-y-4">
								<div className="w-full">
									<TextField
										className="w-full ring-0 outline-none"
										defaultValue=""
										name="price">
										<Label className="text-muted text-sm mb-2">
											Amount <span className="text-orange-500">*</span>
										</Label>
										<InputGroup className="border border-[#e0e0e0]">
											<InputGroup.Prefix>$</InputGroup.Prefix>
											<InputGroup.Input
												className="w-full h-12"
												type="number"
												required
											/>
											<InputGroup.Suffix>USD</InputGroup.Suffix>
										</InputGroup>
									</TextField>
								</div>
								<div className="w-full">
									<Label className="text-muted text-sm">
										Category <span className="text-orange-500">*</span>
									</Label>
									<Select
										className="w-full mt-2 h-12"
										placeholder="Select one"
										onChange={(textValue) => setCategory(textValue as string)}
										isRequired>
										<Select.Trigger className="h-12 flex justify-center items-center border-[#e0e0e0] border">
											<Select.Value />
											<Select.Indicator />
										</Select.Trigger>
										<Select.Popover>
											<ListBox>
												<ListBox.Item
													id="food&dining"
													textValue="food & dining">
													Food & Dining
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item
													id="transport"
													textValue="transport">
													Transport
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item
													id="bills&utilities"
													textValue="bills & utilities">
													Bills & Utilities
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item
													id="health&fitness"
													textValue="health & fitness">
													Health & Fitness
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item
													id="shopping"
													textValue="shopping">
													Shopping
													<ListBox.ItemIndicator />
												</ListBox.Item>
											</ListBox>
										</Select.Popover>
									</Select>
								</div>
								<div className="w-full">
									<Label className="text-muted text-sm">
										Description <span className="text-orange-500">*</span>
									</Label>
									<TextArea
										className="h-26 w-full resize-none mt-2 border border-[#e0e0e0]"
										placeholder="Enter a description for this expense"
										name="description"
										maxLength={20}
										required
									/>
								</div>
								<Button
									className="w-fit mx-auto bg-[#09352b] mt-4"
									type="submit">
									<span>Add Expense</span>
								</Button>
							</form>
						</Modal.Body>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
