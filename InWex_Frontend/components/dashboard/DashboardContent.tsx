"use client";

import Navbar from "@/components/dashboard/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import DashboardAnalysis from "./DashboardAnalysis";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useDashboard } from "@/contexts/DashboardContext";

const DashBoardContent = () => {
    const { user } = useAuth()
    const { downloadReport } = useDashboard()

    const handleDownload = async () => {
        downloadReport()
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-10 pb-20">
            <Navbar />

            <main className="mt-12 md:mt-16">
                <div className="flex justify-between items-start">
                    <div className="space-y-1 gap-5 flex">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                Hello, {user?.fullname?.split(' ')[0] || "User"}!
                            </h1>
                            <p className="text-zinc-500 text-xs">
                                Here is what&apos;s happening with your inventory today.
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleDownload}
                        className="bg-white hover:bg-zinc-200 text-black text-xs! font-medium h-9 rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-white/5 active:scale-95"
                    >
                        <Download className="w-3 h-3" />
                        Download Report
                    </Button>
                </div>

                <div className="mt-10">
                    <DashboardAnalysis />
                </div>
            </main>
        </div>
    )
}

export default DashBoardContent