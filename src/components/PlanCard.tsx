"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { Workout } from "@/types/workout";

interface PlanCardProps {
	workout: Workout;
	isSavedTab: boolean;
	onRemove: (id: number) => void;
	onMarkDone: (id: number) => void;
}

export default function PlanCard({
	workout,
	isSavedTab,
	onRemove,
	onMarkDone,
}: PlanCardProps) {
	return (
		<div
			className={`bg-[#121721] rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
				workout.completed
					? "border-green-800/40 opacity-60"
					: "border-[#1E2638]"
			}`}
		>
			<div className="flex items-center gap-4 w-full sm:w-auto">
				<div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#161B26] shrink-0">
					<Image
						src={workout.image}
						alt={workout.name}
						fill
						sizes="(max-width: 640px) 64px, 80px"
						className="object-cover"
					/>
				</div>
				<div className="space-y-1">
					<h3
						className={`font-mono text-base sm:text-lg font-bold uppercase ${workout.completed ? "line-through text-gray-400" : "text-white"}`}
					>
						{workout.name}
					</h3>
					<p className="text-xs text-gray-400">{workout.equipment}</p>
					<div className="flex items-center gap-3 text-xs text-gray-400 font-mono pt-1">
						<span className="flex items-center gap-1">
							<Clock className="w-3 h-3 text-[#CCFF00]" />{" "}
							{workout.duration} min
						</span>
						<span className="flex items-center gap-1">
							<Flame className="w-3 h-3 text-orange-400" />{" "}
							{workout.caloriesBurned} kcal
						</span>
						<span className="flex items-center gap-1">
							<Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{" "}
							{workout.rating}
						</span>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#1E2638] pt-3 sm:pt-0">
				<Link
					href={`/workout/${workout.id}`}
					className="px-4 py-2 bg-[#161B26] hover:bg-[#1E2638] border border-[#232B3E] rounded-lg text-xs font-semibold text-white transition-colors"
				>
					View Details
				</Link>

				{!isSavedTab && (
					<button
						onClick={() => onMarkDone(workout.id)}
						className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
							workout.completed
								? "bg-green-900/40 text-green-400 border border-green-800"
								: "bg-[#CCFF00] text-black hover:bg-[#b8e600]"
						}`}
					>
						<Check className="w-3.5 h-3.5" />
						{workout.completed ? "Done" : "Mark as Done"}
					</button>
				)}

				<button
					onClick={() => onRemove(workout.id)}
					className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
					aria-label="Remove workout"
				>
					<X className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
