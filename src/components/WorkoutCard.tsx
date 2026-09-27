"use client";

import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
	workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
	return (
		<Link
			href={`/workout/${workout.id}`}
			className="group bg-[#121721] rounded-xl border border-[#1E2638] overflow-hidden hover:border-[#CCFF00]/50 transition-all duration-300 flex flex-col h-full"
		>
			<div className="relative h-48 w-full overflow-hidden bg-[#161B26]">
				<Image
					src={workout.image}
					alt={workout.name}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
					{workout.muscleGroups?.map((group) => (
						<span
							key={group}
							className="bg-[#CCFF00] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider"
						>
							{group}
						</span>
					))}
				</div>
			</div>

			<div className="p-5 flex flex-col flex-1 justify-between gap-4">
				<div>
					<h3 className="font-mono text-lg font-bold text-white uppercase group-hover:text-[#CCFF00] transition-colors">
						{workout.name}
					</h3>
					<p className="text-xs text-gray-400 mt-1 font-medium">
						{workout.equipment}
					</p>
				</div>

				<div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-[#1E2638] font-mono">
					<div className="flex items-center gap-1">
						<Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
						<span>{workout.duration} min</span>
					</div>
					<div className="flex items-center gap-1">
						<Flame className="w-3.5 h-3.5 text-orange-400" />
						<span>{workout.caloriesBurned} kcal</span>
					</div>
					<div className="flex items-center gap-1">
						<Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
						<span>{workout.rating}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
