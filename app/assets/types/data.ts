export type FinanceData = {
	balance: {
		current: number;
		income: number;
		expenses: number;
	};
	transactions: {
		icon?: string;
		category?: string;
		date?: string;
		amount?: number;
		description?: string;
	}[];
	budgets: {
		category?: string;
		minimum?: number;
		maximum?: number;
		spent?: number;
	}[];
};
