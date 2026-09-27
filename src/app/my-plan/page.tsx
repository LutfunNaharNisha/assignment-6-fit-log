"use client";

import PlanCard from "@/components/PlanCard";
import { useFitLog } from "@/context/FitLogContext";
import { Workout } from "@/types/workout";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useSyncExternalStore } from "react";

type SortOption = "duration" | "calories" | "rating";
type TabOption = "today" | "saved";

const emptySubscribe = () => () => {};
function useIsClient() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);
}

function MyPlanContent() {
	const {
		todayPlan,
		savedLifts,
		removeFromPlan,
		removeFromSaved,
		markAsDone,
	} = useFitLog();
	const searchParams = useSearchParams();
	const router = useRouter();
	const isClient = useIsClient();

	const [sortBy, setSortBy] = useState<SortOption>("duration");

	// Derive active tab directly from URL search parameters
	const currentTabParam = searchParams.get("tab");
	const activeTab: TabOption =
		currentTabParam === "saved" ? "saved" : "today";

	const handleTabChange = (tab: TabOption) => {
		if (tab === "saved") {
			router.push("/my-plan?tab=saved");
		} else {
			router.push("/my-plan");
		}
	};

	const currentList: Workout[] =
		activeTab === "today" ? todayPlan : savedLifts;

	const sortedList = [...currentList].sort((a, b) => {
		if (sortBy === "duration") return b.duration - a.duration;
		if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
		if (sortBy === "rating") return b.rating - a.rating;
		return 0;
	});

	const totalMinutes = todayPlan.reduce(
		(acc, curr) => acc + curr.duration,
		0,
	);
	const totalCalories = todayPlan.reduce(
		(acc, curr) => acc + curr.caloriesBurned,
		0,
	);

	if (!isClient) {
		return (
			<div className="space-y-8 animate-pulse">
				<div className="h-10 bg-[#121721] w-48 rounded-lg" />
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-28 bg-[#121721] rounded-2xl border border-[#1E2638]" />
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-extrabold text-white uppercase font-mono tracking-tight">
					MY PLAN
				</h1>
				<p className="text-xs sm:text-sm text-gray-400 mt-1">
					Cap of five lifts for today. Finish them, then load more.
				</p>
			</div>

			{/* Metrics Summary Row */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#121721] p-6 rounded-2xl border border-[#1E2638]">
				<div>
					<p className="text-xs text-gray-400 font-medium">
						Exercises
					</p>
					<p className="text-4xl font-extrabold text-[#D4FF00] font-mono mt-1">
						{todayPlan.length}
					</p>
				</div>
				<div className="sm:border-l border-[#1E2638] sm:pl-6">
					<p className="text-xs text-gray-400 font-medium">Minutes</p>
					<p className="text-4xl font-extrabold text-white font-mono mt-1">
						{totalMinutes}
					</p>
				</div>
				<div className="sm:border-l border-[#1E2638] sm:pl-6">
					<p className="text-xs text-gray-400 font-medium">
						Calories
					</p>
					<p className="text-4xl font-extrabold text-white font-mono mt-1">
						{totalCalories}
					</p>
				</div>
			</div>

			{/* Tabs and Sort controls */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2638] pb-4">
				<div className="flex gap-2 bg-[#121721] p-1 rounded-xl border border-[#1E2638] w-fit">
					<button
						onClick={() => handleTabChange("today")}
						className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
							activeTab === "today"
								? "bg-[#1C280D] text-[#D4FF00] shadow-md"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Today&apos;s Plan
					</button>
					<button
						onClick={() => handleTabChange("saved")}
						className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
							activeTab === "saved"
								? "bg-[#1C280D] text-[#D4FF00] shadow-md"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Saved
					</button>
				</div>

				{/* Sort Dropdown */}
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-400 font-mono">
						Sort By
					</span>
					<div className="relative">
						<select
							value={sortBy}
							onChange={(e) =>
								setSortBy(e.target.value as SortOption)
							}
							className="bg-[#121721] border border-[#1E2638] text-white text-xs rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-[#D4FF00] font-mono cursor-pointer"
						>
							<option value="duration">Duration</option>
							<option value="calories">Calories</option>
							<option value="rating">Rating</option>
						</select>
						<ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
					</div>
				</div>
			</div>

			{/* Workout List / Empty State */}
			{sortedList.length === 0 ? (
				<div className="border border-dashed border-[#232B3E] rounded-2xl p-12 text-center space-y-4 bg-[#121721]/30">
					<h3 className="text-lg font-bold text-white font-mono uppercase">
						NOTHING HERE YET
					</h3>
					<p className="text-xs text-gray-400 max-w-sm mx-auto">
						Browse the library and add a lift to get today moving.
					</p>
					<div>
						<Link
							href="/"
							className="inline-block bg-[#D4FF00] text-black font-bold text-xs px-6 py-3 rounded-xl hover:bg-[#b8e600] transition-all"
						>
							Go to workouts
						</Link>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{sortedList.map((item) => (
						<PlanCard
							key={item.id}
							workout={item}
							isSavedTab={activeTab === "saved"}
							onRemove={
								activeTab === "today"
									? removeFromPlan
									: removeFromSaved
							}
							onMarkDone={markAsDone}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default function MyPlanPage() {
	return (
		<Suspense
			fallback={
				<div className="text-gray-400 font-mono text-xs">
					Loading plan...
				</div>
			}
		>
			<MyPlanContent />
		</Suspense>
	);
}
