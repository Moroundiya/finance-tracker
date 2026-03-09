"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { FinanceData } from "../assets/types/data";

const AppContext = createContext({
	collapseNavbar: false,
	setCollapseNavbar: (value: boolean) => {},
	data: null as FinanceData | null,
	setData: (value: FinanceData) => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [collapseNavbar, setCollapseNavbar] = useState(false);
	const [data, setData] = useState<FinanceData | null>(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem("data");
		return stored
			? JSON.parse(stored)
			: {
					balance: { current: 0, income: 0, expenses: 0 },
					transactions: [],
					budgets: [],
				};
	});

	useEffect(() => {
		localStorage.setItem("data", JSON.stringify(data));
	}, [data]);

	return (
		<AppContext.Provider
			value={{
				collapseNavbar,
				setCollapseNavbar,
				data,
				setData,
			}}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
