import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { Sidebar } from "./components/Sidebar";

const publicSans = Public_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Finance Tracker",
	description:
		"A simple finance tracker built to track your expenses and income.",
	authors: [
		{
			name: "Adewunmi Quadri",
			url: "",
		},
	],
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${publicSans.className} antialiased bg-[#121212]`}>
				<AppProvider>
					<div className="w-full h-dvh flex ">
						<Sidebar />
						<div className="flex-1 h-dvh">{children}</div>
					</div>
				</AppProvider>
			</body>
		</html>
	);
}
