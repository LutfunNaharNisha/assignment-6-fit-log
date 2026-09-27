import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-[#131720] bg-[#0A0D12] py-12 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
				{/* Footer Brand Logo & Tagline */}
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="flex items-center gap-2.5 group"
					>
						<Image
							src="/assets/logo.png"
							alt="FitLog Logo"
							width={24}
							height={24}
							className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-300"
						/>
						<span className="font-extrabold text-lg tracking-wider text-white font-mono">
							FITLOG
						</span>
					</Link>
					<span className="text-gray-600 text-sm hidden sm:inline">
						|
					</span>
					<p className="text-xs text-gray-500 font-mono hidden sm:block">
						Track workouts & build daily routines
					</p>
				</div>

				{/* Navigation Links */}
				<div className="flex items-center gap-6 text-xs text-gray-400 font-mono">
					<Link
						href="/"
						className="hover:text-white transition-colors"
					>
						Workouts
					</Link>
					<Link
						href="/my-plan"
						className="hover:text-white transition-colors"
					>
						My Plan
					</Link>
					<Link
						href="/my-plan?tab=saved"
						className="hover:text-white transition-colors"
					>
						Saved
					</Link>
				</div>

				{/* Copyright Notice */}
				<p className="text-xs text-gray-500 font-mono">
					&copy; {new Date().getFullYear()} FitLog. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
}
