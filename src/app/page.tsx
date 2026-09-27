import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

async function getWorkouts(): Promise<Workout[]> {
	try {
		const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
			next: { revalidate: 60 },
		});
		if (!res.ok) throw new Error("Failed to fetch workouts");
		return res.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}

export default async function HomePage() {
	const workouts = await getWorkouts();

	return (
		<div>
			<Hero />

			<section
				id="library"
				className="scroll-mt-20"
			>
				<div className="mb-6">
					<h2 className="text-2xl font-extrabold text-white uppercase font-mono tracking-wide">
						THE LIBRARY
					</h2>
					<p className="text-xs sm:text-sm text-gray-400 mt-1">
						Twelve lifts covering every major muscle group.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{workouts.map((workout) => (
						<WorkoutCard
							key={workout.id}
							workout={workout}
						/>
					))}
				</div>
			</section>
		</div>
	);
}
