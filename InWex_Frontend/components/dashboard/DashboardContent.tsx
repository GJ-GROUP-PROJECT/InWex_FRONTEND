"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useState } from "react"
import Navbar from "@/components/dashboard/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import DashboardAnalysis from "./DashboardAnalysis";
import { Download, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDashboard } from "@/contexts/DashboardContext";

const DashBoardContent = () => {
    const { user } = useAuth()
    const { downloadReport } = useDashboard()

    const [today] = useState(() => {
        const current = new Date()
        const weekday = current.toLocaleString("en-US", { weekday: "short" });
        const day = current.getDate();
        const month = current.toLocaleString("en-US", { month: "short" });
        return `${weekday}, ${day} ${month}`;
    })

    const navbarLeftContent = (
        <div className="flex items-center space-x-6">
            <InputGroup className="bg-zinc-900/50 border-none w-100 h-10 pl-4 rounded-xl focus-within:bg-zinc-900 transition-colors">
                <InputGroupInput
                    placeholder="Search analytics, products..."
                    className="text-xs! placeholder:text-zinc-600 text-zinc-300"
                />
                <InputGroupAddon>
                    <SearchIcon className="h-3 w-3 text-zinc-500" />
                </InputGroupAddon>
            </InputGroup>
            <div className="hidden md:flex flex-col">
                <p className="text-[10px]! uppercase font-bold text-zinc-500 tracking-widest">Current Date</p>
                <p className="text-xs! font-medium text-zinc-300">{today}</p>
            </div>
        </div>
    )

    const handleDownload = async () => {
        downloadReport()
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-10 pb-20">
            <Navbar leftContent={navbarLeftContent} />

            <main className="mt-12 md:mt-16">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Hello, {user?.fullname?.split(' ')[0] || "User"}!
                        </h1>
                        <p className="text-zinc-500 text-xs">
                            Here is what&apos;s happening with your inventory today.
                        </p>
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