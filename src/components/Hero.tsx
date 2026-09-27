"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import bannerImg from "../../public/assets/banner.png"; // Static import for automatic dimensions & optimal LCP

export default function Hero() {
	const scrollToLibrary = () => {
		document
			.getElementById("library")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="bg-[#121721] rounded-2xl border border-[#1E2638] p-6 sm:p-12 mb-12 relative overflow-hidden">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
				<div className="lg:col-span-7 space-y-4">
					<span className="text-[#CCFF00] font-mono text-xs font-bold tracking-widest uppercase bg-[#CCFF00]/10 px-3 py-1 rounded-full inline-block">
						WORKOUT LIBRARY
					</span>
					<h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase font-mono">
						TRAIN WITH INTENT. <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-300 to-[#CCFF00]">
							LOG EVERY SET.
						</span>
					</h1>
					<p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
						FitLog is a dark, no-nonsense gym companion: pick a
						lift, lock it into today&apos;s plan, and watch the
						week&apos;s work add up.
					</p>
					<div className="pt-2">
						<button
							onClick={scrollToLibrary}
							className="inline-flex items-center gap-2 bg-[#CCFF00] text-black font-bold px-6 py-3.5 rounded-xl hover:bg-[#b8e600] transition-all transform active:scale-95 shadow-lg shadow-[#CCFF00]/10 cursor-pointer"
						>
							BROWSE WORKOUTS
							<ArrowDown className="w-4 h-4" />
						</button>
					</div>
				</div>

				<div className="lg:col-span-5 flex justify-center relative">
					<div className="w-64 h-64 sm:w-80 sm:h-80 relative rounded-2xl overflow-hidden">
						<Image
							src={bannerImg}
							alt="Gym Companion"
							priority
							placeholder="blur"
							className="object-cover w-full h-full opacity-85"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
