"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import StaffPage from "@/components/dashboard/staff/StaffPage"
import { Card, CardContent } from "@/components/ui/card"
import { useStaff } from "@/contexts/StaffContext"
import { Loader2, UserRound } from "lucide-react"
import { use, useEffect } from "react"

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)

    const { selectedStaff, isLoading, fetchStaff } = useStaff()

    useEffect(() => {
        fetchStaff(Number(id))
    }, [id, fetchStaff])

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-xs border-none shadow-none">
                <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="bg-zinc-900 rounded-full p-3 border border-zinc-800">
                        <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-zinc-300 font-semibold text-sm tracking-tight">Syncing Profile</p>
                        <p className="text-zinc-500 text-xs">Accessing staff directory...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (!selectedStaff || selectedStaff.id !== Number(id)) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-xs border-none shadow-none">
                <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="bg-zinc-900 rounded-full p-3 border border-zinc-800">
                        <UserRound className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-zinc-300 font-semibold text-sm tracking-tight">Staff Not Found</p>
                        <p className="text-zinc-500 text-xs">This profile may have been removed or the ID is incorrect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <>
            <Navbar />
            <StaffPage staff={selectedStaff} />
        </>
    )
}

export default Page