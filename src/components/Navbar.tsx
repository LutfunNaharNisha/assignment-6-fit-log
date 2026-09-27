"use client";

import { useState, useEffect, useSyncExternalStore, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, DumbbellIcon, Bookmark, ChevronRight } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const emptySubscribe = () => () => {};
function useIsClient() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);
}

function NavbarContent() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const isClient = useIsClient();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { todayPlan, savedLifts } = useFitLog();

	const isMyPlanPage = pathname === "/my-plan";
	const isSavedTab =
		isClient && isMyPlanPage && searchParams.get("tab") === "saved";
	const isTodayPlanTab = isClient && isMyPlanPage && !isSavedTab;
	const isWorkoutsActive = isClient && pathname === "/";

	const closeMenu = () => setMobileMenuOpen(false);

	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [mobileMenuOpen]);

	return (
		<header className="border-b border-[#131720] bg-[#0A0D12] sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				{/* Brand Logo Image */}
				<Link
					href="/"
					onClick={closeMenu}
					className="flex items-center gap-2.5 group"
				>
					<Image
						src="/assets/logo.png"
						alt="FitLog Logo"
						width={28}
						height={28}
						className="w-7 h-7 object-contain group-hover:scale-105 transition-transform duration-300"
						priority
					/>
					<span className="font-extrabold text-xl tracking-wider text-white font-mono">
						FITLOG
					</span>
				</Link>

				{/* Center Navigation Links */}
				<nav className="hidden md:flex items-center gap-2">
					<Link
						href="/"
						className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
							isWorkoutsActive
								? "bg-[#1C280D] text-[#D4FF00] font-semibold"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Workouts
					</Link>
					<Link
						href="/my-plan"
						className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
							isMyPlanPage
								? "bg-[#1C280D] text-[#D4FF00] font-semibold"
								: "text-gray-400 hover:text-white"
						}`}
					>
						My Plan
					</Link>
				</nav>

				{/* Right Action Counters — ONLY counter badge bg changes */}
				<div className="hidden md:flex items-center gap-6">
					<Link
						href="/my-plan"
						className="flex items-center gap-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
					>
						<span>Plan</span>
						<span
							className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
								isTodayPlanTab
									? "bg-[#D4FF00] text-black"
									: "bg-[#121620] border border-[#262B36] text-gray-300"
							}`}
						>
							{isClient ? todayPlan.length : 0}
						</span>
					</Link>

					<Link
						href="/my-plan?tab=saved"
						className="flex items-center gap-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
					>
						<span>Saved</span>
						<span
							className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
								isSavedTab
									? "bg-[#D4FF00] text-black"
									: "bg-[#121620] border border-[#262B36] text-gray-300"
							}`}
						>
							{isClient ? savedLifts.length : 0}
						</span>
					</Link>
				</div>

				{/* Mobile Hamburger Toggle */}
				<div className="flex md:hidden items-center gap-2 z-50">
					<button
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="p-2 text-gray-300 hover:text-white bg-[#121620] border border-[#262B36] rounded-xl focus:outline-none focus:border-[#D4FF00] transition-colors"
						aria-label="Toggle Navigation Menu"
						aria-expanded={mobileMenuOpen}
					>
						{mobileMenuOpen ? (
							<X className="w-5 h-5 text-[#D4FF00]" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Drawer Overlay */}
			{mobileMenuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
				/>
			)}

			{/* Mobile Menu Panel */}
			<div
				className={`fixed top-16 left-0 right-0 bg-[#0A0D12] border-b border-[#131720] p-6 z-40 md:hidden transition-all duration-300 transform shadow-2xl ${
					mobileMenuOpen
						? "opacity-100 translate-y-0 pointer-events-auto"
						: "opacity-0 -translate-y-4 pointer-events-none"
				}`}
			>
				<div className="flex flex-col gap-4">
					<div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold px-2">
						Navigation
					</div>

					<nav className="flex flex-col gap-2">
						<Link
							href="/"
							onClick={closeMenu}
							className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold transition-all ${
								isWorkoutsActive
									? "bg-[#1C280D] text-[#D4FF00]"
									: "bg-[#121620] text-gray-300 hover:text-white border border-[#1E2638]"
							}`}
						>
							<span className="flex items-center gap-2.5">
								<DumbbellIcon className="w-4 h-4" />
								Workouts
							</span>
							<ChevronRight className="w-4 h-4 opacity-70" />
						</Link>

						<Link
							href="/my-plan"
							onClick={closeMenu}
							className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold transition-all ${
								isMyPlanPage
									? "bg-[#1C280D] text-[#D4FF00]"
									: "bg-[#121620] text-gray-300 hover:text-white border border-[#1E2638]"
							}`}
						>
							<span className="flex items-center gap-2.5">
								<Bookmark className="w-4 h-4" />
								My Plan
							</span>
							<ChevronRight className="w-4 h-4 opacity-70" />
						</Link>
					</nav>

					<div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold px-2 pt-2">
						Quick Stats
					</div>

					<div className="grid grid-cols-2 gap-3">
						<Link
							href="/my-plan"
							onClick={closeMenu}
							className="flex items-center justify-between p-3 rounded-xl border border-[#1E2638] bg-[#121620] text-gray-300"
						>
							<span className="text-xs font-semibold">
								Today Plan
							</span>
							<span
								className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
									isTodayPlanTab
										? "bg-[#D4FF00] text-black"
										: "bg-[#121620] border border-[#262B36] text-gray-300"
								}`}
							>
								{isClient ? todayPlan.length : 0}
							</span>
						</Link>

						<Link
							href="/my-plan?tab=saved"
							onClick={closeMenu}
							className="flex items-center justify-between p-3 rounded-xl border border-[#1E2638] bg-[#121620] text-gray-300"
						>
							<span className="text-xs font-semibold">
								Saved Lifts
							</span>
							<span
								className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
									isSavedTab
										? "bg-[#D4FF00] text-black"
										: "bg-[#121620] border border-[#262B36] text-gray-300"
								}`}
							>
								{isClient ? savedLifts.length : 0}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

export default function Navbar() {
	return (
		<Suspense fallback={null}>
			<NavbarContent />
		</Suspense>
	);
}
