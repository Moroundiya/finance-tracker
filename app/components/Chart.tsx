import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const BUDGET_MAX = 500;

const CATEGORIES = [
	{
		id: "food",
		label: "Food",
		color: "#F59E0B",
		keywords: ["food", "grocery", "groceries", "restaurant", "dining"],
	},
	{
		id: "transport",
		label: "Transport",
		color: "#3B82F6",
		keywords: [
			"transport",
			"transportation",
			"commute",
			"fuel",
			"uber",
			"taxi",
		],
	},
	{
		id: "bills",
		label: "Bills",
		color: "#EC4899",
		keywords: [
			"bills",
			"bill",
			"utilities",
			"bills&utilities",
			"electricity",
			"water",
			"internet",
		],
	},
	{
		id: "health",
		label: "Health",
		color: "#10B981",
		keywords: [
			"health",
			"medical",
			"pharmacy",
			"doctor",
			"fitness",
			"gym",
			"health&fitness",
		],
	},
	{
		id: "shopping",
		label: "Shopping",
		color: "#A78BFA",
		keywords: [
			"shopping",
			"clothes",
			"clothing",
			"entertainment",
			"electronics",
		],
	},
];

function mapCategory(raw = "") {
	const lower = raw.toLowerCase().trim();
	for (const cat of CATEGORIES) {
		if (cat.keywords.some((kw) => lower.includes(kw))) return cat.id;
	}
	return null;
}

interface Transaction {
	category: string;
	amount: string | number;
}

function loadTransactions() {
	try {
		const raw = localStorage.getItem("data");
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		const txns = parsed?.transactions ?? [];
		return txns.filter((tx: Transaction) => tx.category !== "income");
	} catch {
		return [];
	}
}

function calcTotals(transactions: Transaction[]) {
	const totals = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0]));
	transactions.forEach((tx: Transaction) => {
		const catId = mapCategory(tx.category);
		if (catId) totals[catId] += Number(tx.amount) || 0;
	});
	return totals;
}

const CustomTooltip = ({
	active,
	payload,
}: {
	active?: boolean;
	payload?: Array<{ payload: { label: string; value: number; color: string } }>;
}) => {
	if (!active || !payload?.length) return null;
	const d = payload[0].payload;
	return (
		<div
			className="bg-[#1c1c1c] rounded-lg px-3 py-2"
			style={{ border: `1px solid ${d.color}55` }}>
			<p
				className="text-xs font-mono mb-0.5"
				style={{ color: d.color }}>
				{d.label}
			</p>
			<p className="text-white text-sm font-bold font-mono">
				${d.value.toFixed(2)}
			</p>
		</div>
	);
};

export default function Chart() {
	const [totals, setTotals] = useState(
		Object.fromEntries(CATEGORIES.map((c) => [c.id, 0])),
	);
	const [activeId, setActiveId] = useState<string | null>(null);

	function refresh() {
		setTotals(calcTotals(loadTransactions()));
	}

	useEffect(() => {
		refresh();
		const interval = setInterval(refresh, 1000);
		const onStorage = (e: StorageEvent) => {
			if (e.key === "data") refresh();
		};
		window.addEventListener("storage", onStorage);
		return () => {
			clearInterval(interval);
			window.removeEventListener("storage", onStorage);
		};
	}, []);

	const pieData = CATEGORIES.map((cat) => ({
		...cat,
		value: totals[cat.id],
	})).filter((d) => d.value > 0);
	const totalSpent = CATEGORIES.reduce((sum, c) => sum + totals[c.id], 0);
	const hasData = pieData.length > 0;

	return (
		<div className="bg-[#181818] border border-[#222] rounded-2xl p-8 w-full">
			{!hasData ? (
				<div className="text-center py-16 text-[#333] font-mono text-sm">
					No expense transactions found.
					<br />
					Add some expenses to see the chart.
				</div>
			) : (
				<div className="relative">
					<ResponsiveContainer
						width="100%"
						height={220}>
						<PieChart>
							<Pie
								data={pieData}
								cx="50%"
								cy="50%"
								innerRadius={72}
								outerRadius={105}
								paddingAngle={2}
								dataKey="value"
								isAnimationActive={true}
								animationBegin={0}
								animationDuration={1000}
								animationEasing="ease-out"
								onMouseEnter={(_, idx) => setActiveId(pieData[idx].id)}
								onMouseLeave={() => setActiveId(null)}
								stroke="none">
								{pieData.map((entry) => (
									<Cell
										key={entry.id}
										fill={entry.color}
										opacity={
											activeId === null || activeId === entry.id ? 1 : 0.3
										}
										style={{ cursor: "pointer", transition: "opacity 0.15s" }}
									/>
								))}
							</Pie>
							<Tooltip content={<CustomTooltip />} />
						</PieChart>
					</ResponsiveContainer>

					<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className="text-[#9ca3af] text-[10px] font-mono tracking-widest">
							TOTAL SPENT
						</span>
						<span className="text-white text-xl font-bold font-mono">
							${totalSpent.toFixed(0)}
						</span>
					</div>
				</div>
			)}

			<div className="mt-6 flex flex-col gap-3">
				{CATEGORIES.map((cat) => {
					const spent = totals[cat.id];
					const pct = Math.min((spent / BUDGET_MAX) * 100, 100);
					const over = spent > BUDGET_MAX;
					const remaining = BUDGET_MAX - spent;
					const isActive = activeId === cat.id;

					return (
						<div
							key={cat.id}
							className="flex flex-col gap-1 cursor-pointer transition-opacity duration-150"
							style={{ opacity: activeId && !isActive ? 0.35 : 1 }}
							onMouseEnter={() => setActiveId(cat.id)}
							onMouseLeave={() => setActiveId(null)}>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span
										className="w-2 h-2 rounded-full shrink-0"
										style={{ background: cat.color }}
									/>
									<span className="text-[#ccc] text-[13px]">{cat.label}</span>
									{over && (
										<span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">
											OVER
										</span>
									)}
								</div>
								<div className="font-mono text-[12px] text-[#555]">
									<span
										className="font-semibold"
										style={{ color: over ? "#EF4444" : cat.color }}>
										${spent.toFixed(0)}
									</span>
									<span> / ${BUDGET_MAX}</span>
								</div>
							</div>

							<div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
								<div
									className="h-full rounded-full transition-all duration-300"
									style={{
										width: `${pct}%`,
										background: over
											? `linear-gradient(90deg, ${cat.color}, #EF4444)`
											: cat.color,
									}}
								/>
							</div>

							<div className="text-right font-mono text-[10px] text-[#333]">
								{over
									? `$${Math.abs(remaining).toFixed(0)} over budget`
									: `$${remaining.toFixed(0)} remaining`}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
