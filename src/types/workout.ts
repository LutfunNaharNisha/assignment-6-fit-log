export interface Workout {
	id: number;
	name: string;
	category: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	duration: number; // in minutes
	caloriesBurned: number;
	image: string;
	rating: number;
	sets: number;
	reps: number;
	equipment: string;
	description: string;
	muscleGroups: string[];
	instructions: string[];
	completed?: boolean;
}

export interface FitLogContextType {
	todayPlan: Workout[];
	savedLifts: Workout[];
	addToTodayPlan: (workout: Workout) => boolean;
	saveForLater: (workout: Workout) => boolean;
	removeFromPlan: (id: number) => void;
	removeFromSaved: (id: number) => void;
	markAsDone: (id: number) => void;
}
