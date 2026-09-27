import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
			<h1 className="text-6xl font-extrabold text-[#CCFF00] font-mono">
				404
			</h1>
			<h2 className="text-xl font-bold text-white uppercase font-mono">
				PAGE NOT FOUND
			</h2>
			<p className="text-xs text-gray-400 max-w-xs">
				The lift or route you are looking for does not exist in the
				training regimen.
			</p>
			<Link
				href="/"
				className="bg-[#CCFF00] text-black font-bold text-xs px-6 py-3 rounded-xl hover:bg-[#b8e600] transition-all"
			>
				Return to Safety
			</Link>
		</div>
	);
}
