import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import { FitLogProvider } from "@/context/FitLogContext";
import { ToastContainer } from "react-toastify";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FitLog — Modern Workout Planner",
	description:
		"Log your gym sets, organize daily workouts, and stay on track.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className="dark"
		>
			<body
				className={`${inter.className} bg-[#0B0E14] text-white min-h-screen flex flex-col`}
			>
				<FitLogProvider>
					<Navbar />
					<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{children}
					</main>
					<Footer />
					<ToastContainer
						position="bottom-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
				</FitLogProvider>
			</body>
		</html>
	);
}
