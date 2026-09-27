export default function Loading() {
	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
			<div className="w-8 h-8 border-2 border-[#CCFF00] border-t-transparent rounded-full animate-spin" />
			<p className="text-xs font-mono text-gray-400 animate-pulse">
				Loading workouts…
			</p>
		</div>
	);
}
