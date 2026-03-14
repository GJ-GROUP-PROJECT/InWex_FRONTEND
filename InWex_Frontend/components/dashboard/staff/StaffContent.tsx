"use client"

import { Button } from "@/components/ui/button"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useStaff } from "@/contexts/StaffContext"
import { Loader2, Phone, UserRound, ChevronRight, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

const StaffContent = () => {
    const router = useRouter()
    const { staffs, isLoading, error, fetchStaff, fetchStaffBySearch } = useStaff()

    useEffect(() => {
        fetchStaff(true)
    }, [fetchStaff])

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            fetchStaff(true)
            return
        }
        fetchStaffBySearch(value)
    }, 300)

    return (
        <main className="mt-12 w-full px-4 md:px-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-white">Staff List</h1>
                <p className="text-zinc-500 mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {staffs.length} Staff Members
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                <div className="flex-1 w-full">
                    <SearchbarWithFilter
                        filters={[
                            { label: "All warehouses", value: "allWarehouses" },
                            { label: "Mumbai", value: "mumbai" },
                        ]}
                        onFilterSelect={(value) => console.log("Warehouse filter:", value)}
                        onSearch={handleSearch}
                    />
                </div>
            </div>

            {isLoading && (
                <div className="flex flex-col justify-center items-center py-32 gap-4">
                    <Loader2 className="h-10 w-10 text-zinc-600 animate-spin" />
                    <p className="text-zinc-500 animate-pulse">Syncing staff directory...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {staffs.length > 0 ? (
                        staffs.map((staff) => (
                            <div
                                key={staff.id}
                                className="flex items-center gap-4 bg-zinc-900/40 border-none rounded-2xl p-6 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-full bg-zinc-800/50 shrink-0 flex items-center justify-center border-none">
                                    <UserRound className="h-6 w-6 text-zinc-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-zinc-100 text-lg truncate">
                                        {staff.user?.fullname || staff.fullname}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-zinc-500">
                                        <div className="bg-zinc-800 p-1 rounded-md">
                                            <Phone className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm font-medium">{staff.user?.contact_number || staff.contact_number}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => router.push(`/dashboard/staff/${staff.id}`)}
                                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 border-none hover:border-zinc-700 rounded-xl px-5 py-6"
                                >
                                    Details
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-800 rounded-3xl">
                            <Users className="h-12 w-12 text-zinc-700 mb-4" />
                            <p className="text-zinc-400 text-lg font-medium">Your staff directory is empty</p>
                            <p className="text-zinc-600 text-sm">Click &#34;Add New Staff&#34; to populate your list.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default StaffContent