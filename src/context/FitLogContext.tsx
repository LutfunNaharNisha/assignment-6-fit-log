"use client";

import { FitLogContextType, Workout } from "@/types/workout";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
	const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
		if (typeof window === "undefined") return [];
		try {
			const storedPlan = localStorage.getItem("fitlog_today_plan");
			return storedPlan ? JSON.parse(storedPlan) : [];
		} catch (e) {
			console.error("Failed to load today plan from local storage:", e);
			return [];
		}
	});

	const [savedLifts, setSavedLifts] = useState<Workout[]>(() => {
		if (typeof window === "undefined") return [];
		try {
			const storedSaved = localStorage.getItem("fitlog_saved");
			return storedSaved ? JSON.parse(storedSaved) : [];
		} catch (e) {
			console.error("Failed to load saved lifts from local storage:", e);
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
	}, [todayPlan]);

	useEffect(() => {
		localStorage.setItem("fitlog_saved", JSON.stringify(savedLifts));
	}, [savedLifts]);

	const addToTodayPlan = (workout: Workout): boolean => {
		if (todayPlan.some((item) => item.id === workout.id)) {
			toast.error("Workout is already in today's plan!");
			return false;
		}
		if (todayPlan.length >= 5) {
			toast.error("Daily cap reached! (Max 5 lifts allowed)");
			return false;
		}
		setTodayPlan((prev) => [...prev, { ...workout, completed: false }]);
		toast.success(`Added "${workout.name}" to today's plan`);
		return true;
	};

	const saveForLater = (workout: Workout): boolean => {
		if (savedLifts.some((item) => item.id === workout.id)) {
			toast.error("Workout is already saved!");
			return false;
		}
		setSavedLifts((prev) => [...prev, workout]);
		toast.success(`Saved "${workout.name}" for later`);
		return true;
	};

	const removeFromPlan = (id: number) => {
		setTodayPlan((prev) => prev.filter((item) => item.id !== id));
		toast.info("Removed from today's plan");
	};

	const removeFromSaved = (id: number) => {
		setSavedLifts((prev) => prev.filter((item) => item.id !== id));
		toast.info("Removed from saved list");
	};

	const markAsDone = (id: number) => {
		setTodayPlan((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item,
			),
		);
		toast.success("Workout status updated!");
	};

	return (
		<FitLogContext.Provider
			value={{
				todayPlan,
				savedLifts,
				addToTodayPlan,
				saveForLater,
				removeFromPlan,
				removeFromSaved,
				markAsDone,
			}}
		>
			{children}
		</FitLogContext.Provider>
	);
}

export const useFitLog = (): FitLogContextType => {
	const context = useContext(FitLogContext);
	if (!context) {
		throw new Error("useFitLog must be used within a FitLogProvider");
	}
	return context;
};
