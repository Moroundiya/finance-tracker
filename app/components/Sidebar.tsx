"use client";

import React, { useEffect } from "react";
import logo from "../assets/images/logo.svg";
import logoCollapse from "../assets/images/logo-collapse.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppContext } from "../context/AppContext";
import { sidebar } from "../assets/data/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Sidebar = () => {
	const { collapseNavbar, setCollapseNavbar, fullName } = useAppContext() as {
		collapseNavbar: boolean;
		setCollapseNavbar: (collapse: boolean) => void;
		fullName: string;
	};
	const location = usePathname();

	useEffect(() => {
		// if (!fullName) {
		// 	alert("Please enter your name to continue.");
		// 	navigate("/");
		// }
	}, []);

	return (
		<>
			<div className="w-full h-[70px] fixed left-0 bottom-0 bg-[#1a1a1a] rounded-t-2xl z-50 overflow-hidden flex justify-center items-center xl:hidden">
				{sidebar.map((item) => {
					return (
						<Link
							href={item.link}
							key={item.icon}
							className={`${
								location === item.link
									? "bg-[#121212] text-[#277c78] before:content-[''] before:absolute before:left-0 before:bottom-0 before:border-b-[5px] before:border-[#277c78] before:z-20 before:w-full before:h-full"
									: "text-[#b3b3b3]"
							} flex w-1/6 h-full items-center relative z-40`}>
							<div className="flex justify-center items-center w-full">
								<Icon
									icon={
										item.icon === "material-symbols:dark-mode"
											? "material-symbols:light-mode-rounded"
											: item.icon
									}
									className={`${
										item.icon == "bx:transfer" && "rotate-90"
									} text-[1.6rem]`}
								/>
							</div>
						</Link>
					);
				})}
			</div>
			<div
				className={`${
					collapseNavbar ? "w-[6%]" : "w-1/5"
				} rounded-r-3xl h-full bg-[#1A1A1A] pt-10 pb-16 flex-col justify-between transition-all duration-300 ease-in-out hidden xl:flex`}>
				<div className="h-[200px] xl:h-[200px] relative">
					{collapseNavbar ? (
						<Image
							src={logoCollapse}
							className="w-4 xl:ms-5 2xl:ms-8"
							alt="Logo"
						/>
					) : (
						<Image
							src={logo}
							className="w-[125px] xl:ms-5 2xl:ms-8 transition-all duration-500 ease-in-out"
							alt="Logo"
						/>
					)}
				</div>

				<div className="h-[290px] flex flex-col text-xl font-semibold w-full -mt-20">
					{sidebar.slice(0, 5).map((item) => {
						return (
							<Link
								href={item.link}
								key={item.icon}
								className={`${
									location === item.link
										? " after:content-[''] after:h-full after:w-10/12 after:absolute after:left-0 after:top-0 after:-z-10 after:bg-[#f8f4f0] text-[#201f24] after:rounded-r-xl relative before:content-[''] before:absolute before:left-0 before:top-0 before:border-s-[7px] before:border-[#277c78] before:z-20 before:h-full"
										: "text-[#e0e0e0] group"
								} flex items-center relative z-10 h-1/5`}>
								<div className="w-full h-full xl:ps-5 2xl:ps-7 flex items-center space-x-2">
									<div>
										<Icon
											icon={item.icon}
											className={`${
												location == item.link ? "text-[#277c78]" : ""
											} ${
												item.icon == "bx:transfer" && "rotate-90"
											} text-[25px] group-hover:transition-all group-hover:duration-100 group-hover:ease-in-out group-hover:text-[#444444]`}
										/>
									</div>
									<p
										className={`${
											collapseNavbar && "w-0 opacity-0 hidden"
										} w-4/5 overflow-hidden text-[1.08rem] group-hover:text-[#444444] space-x-1`}>
										<span>{item.menuName}</span>
										<span>{item.menuName2}</span>
									</p>
								</div>
							</Link>
						);
					})}
				</div>

				<div className="h-1/6 text-xl text-[#b3b3b3] font-semibold w-full">
					<div
						className={`cursor-pointer h-1/2
							flex gap-3 items-center group`}
						onClick={() => setCollapseNavbar(!collapseNavbar)}>
						<div className="w-full h-full xl:ps-5 2xl:ps-7 flex items-center space-x-2">
							<div>
								<Icon
									icon="line-md:arrow-open-up"
									className={`${
										collapseNavbar ? "rotate-90" : "-rotate-90"
									} text-[25px] group-hover:transition-all group-hover:duration-100 group-hover:ease-in-out group-hover:text-[#444444]`}
								/>
							</div>
							<p
								className={`${
									collapseNavbar && "w-0 opacity-0 hidden"
								} w-4/5 overflow-hidden text-[1.08rem] group-hover:text-[#444444] space-x-1.5`}>
								<span>Minimize</span>
								<span>Menu</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
