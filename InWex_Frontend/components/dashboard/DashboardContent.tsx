"use client";

import Navbar from "@/components/dashboard/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import DashboardAnalysis from "./DashboardAnalysis";
import { Download, Warehouse } from "lucide-react";
import { Button } from "../ui/button";
import { useDashboard } from "@/contexts/DashboardContext";

const DashBoardContent = () => {
    const { user } = useAuth()
    const { downloadReport, error } = useDashboard()
    const isNoWarehouse = error?.toLowerCase().includes("no warehouse access")

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

                    {isNoWarehouse && (
                        <div className="absolute inset-0 backdrop-blur-md bg-black/40 rounded-xl flex flex-col items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-3 text-center px-6">
                                <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                    <Warehouse className="w-5 h-5 text-zinc-500" />
                                </div>
                                <h2 className="text-white font-bold text-lg">No Warehouse Assigned</h2>
                                <p className="text-zinc-500 text-xs max-w-xs">
                                    Your account hasn&apos;t been linked to a warehouse yet. Contact your administrator to get access.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default DashBoardContent