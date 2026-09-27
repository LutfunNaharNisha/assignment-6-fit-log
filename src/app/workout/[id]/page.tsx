"use client";

import { useFitLog } from "@/context/FitLogContext";
import { Workout } from "@/types/workout";
import { ArrowLeft, Bookmark, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function WorkoutDetailPage({ params }: PageProps) {
	const resolvedParams = use(params);
	const id = resolvedParams.id;
	const [workout, setWorkout] = useState<Workout | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { addToTodayPlan, saveForLater } = useFitLog();

	useEffect(() => {
		async function fetchDetail() {
			try {
				const res = await fetch(
					`https://api.abcz.workers.dev/api/fitlog/${id}`,
				);
				if (!res.ok) throw new Error("Workout not found");
				const data: Workout = await res.json();
				setWorkout(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		fetchDetail();
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<p className="text-gray-400 font-mono text-sm animate-pulse">
					Loading workout specs...
				</p>
			</div>
		);
	}

	if (!workout) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
				<p className="text-red-400 font-mono text-base">
					Workout detail not found.
				</p>
				<Link
					href="/"
					className="bg-[#161B26] px-4 py-2 rounded-lg text-xs font-semibold text-white"
				>
					Back to Workouts
				</Link>
			</div>
		);
	}

	const specsTable: [string, string | number][] = [
		["EQUIPMENT", workout.equipment],
		["DIFFICULTY", workout.difficulty],
		["SETS", workout.sets],
		["REPS", workout.reps],
		["DURATION", `${workout.duration} min`],
		["CALORIES", `${workout.caloriesBurned} kcal`],
		["RATING", workout.rating],
	];

	return (
		<div className="space-y-6">
			<Link
				href="/"
				className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors font-mono"
			>
				<ArrowLeft className="w-3.5 h-3.5" /> Back to Workouts
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				{/* Left Column: Media */}
				<div className="lg:col-span-5 bg-[#121721] border border-[#1E2638] rounded-2xl overflow-hidden relative aspect-square w-full">
					<Image
						src={workout.image}
						alt={workout.name}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 40vw"
						className="object-cover"
					/>
				</div>

				{/* Right Column: Specs & Instructions */}
				<div className="lg:col-span-7 space-y-6">
					<div>
						<h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono uppercase">
							{workout.name}
						</h1>
						<p className="text-sm text-gray-400 mt-2 leading-relaxed">
							{workout.description}
						</p>
						<div className="flex gap-2 mt-4">
							{workout.muscleGroups?.map((group) => (
								<span
									key={group}
									className="bg-[#CCFF00] text-black text-xs font-bold uppercase px-3 py-1 rounded-md"
								>
									{group}
								</span>
							))}
						</div>
					</div>

					{/* Key Specs Table */}
					<div className="bg-[#121721] rounded-xl border border-[#1E2638] overflow-hidden text-xs sm:text-sm font-mono">
						{specsTable.map(([label, val], idx) => (
							<div
								key={label}
								className={`flex justify-between items-center px-4 py-3 ${
									idx !== 0 ? "border-t border-[#1E2638]" : ""
								}`}
							>
								<span className="text-gray-400 font-bold">
									{label}
								</span>
								<span className="text-white font-semibold">
									{val}
								</span>
							</div>
						))}
					</div>

					{/* Instructions */}
					<div className="space-y-3">
						<h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
							INSTRUCTIONS
						</h3>
						<ol className="space-y-2">
							{workout.instructions?.map((step, idx) => (
								<li
									key={idx}
									className="flex gap-3 text-xs sm:text-sm text-gray-300"
								>
									<span className="text-[#CCFF00] font-bold font-mono">
										{idx + 1}.
									</span>
									<span>{step}</span>
								</li>
							))}
						</ol>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 pt-2">
						<button
							onClick={() => addToTodayPlan(workout)}
							className="flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
						>
							<PlusCircle className="w-4 h-4" /> Add to
							today&apos;s plan
						</button>
						<button
							onClick={() => saveForLater(workout)}
							className="flex-1 bg-[#161B26] hover:bg-[#1E2638] text-white border border-[#232B3E] font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
						>
							<Bookmark className="w-4 h-4" /> Save for later
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
