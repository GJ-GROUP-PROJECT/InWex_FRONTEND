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
        <main className="mt-10 w-full px-4 md:px-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white">Staff List</h1>
                <p className="text-zinc-500 mt-0.5 flex items-center gap-1.5 text-xs">
                    <Users className="h-3 w-3" />
                    {staffs.length ?? 0} Staff Members
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
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
                <div className="flex flex-col justify-center items-center py-20 gap-3">
                    <Loader2 className="h-5 w-5 text-zinc-600 animate-spin" />
                    <p className="text-zinc-500 text-xs animate-pulse">Syncing staff directory...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {staffs?.length > 0 ? (
                        staffs.map((staff) => (
                            <div
                                key={staff.id}
                                className="flex items-center gap-3 bg-zinc-900/40 border-none rounded-xl p-4 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-full bg-zinc-800/50 shrink-0 flex items-center justify-center">
                                    <UserRound className="h-4 w-4 text-zinc-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-zinc-100 text-xs truncate">
                                        {staff.user?.fullname || staff.fullname}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-zinc-500">
                                        <div className="bg-zinc-800 p-0.5 rounded">
                                            <Phone className="h-2.5 w-2.5" />
                                        </div>
                                        <span className="text-[10px] font-medium">{staff.user?.contact_number || staff.contact_number}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => router.push(`/dashboard/staff/${staff.id}`)}
                                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 border-none rounded-lg h-8 px-3 text-[11px]"
                                >
                                    Details
                                    <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
                            <Users className="h-8 w-8 text-zinc-700 mb-3" />
                            <p className="text-zinc-400 text-sm font-medium">Your staff directory is empty</p>
                            <p className="text-zinc-600 text-xs mt-0.5">Click &#34;Add New Staff&#34; to populate your list.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default StaffContent