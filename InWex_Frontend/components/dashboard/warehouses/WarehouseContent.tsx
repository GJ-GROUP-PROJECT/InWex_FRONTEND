"use client"

import { Button } from "@/components/ui/button"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { Loader2, Plus, Warehouse, ChevronRight, WarehouseIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

const WarehouseContent = () => {
    const router = useRouter()
    const { warehouses, isLoading, error, count, fetchWarehouses, fetchWarehouseBySearch } = useWarehouse()

    useEffect(() => {
        fetchWarehouses(true)
    }, [fetchWarehouses])

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            fetchWarehouses(true)
            return
        }
        fetchWarehouseBySearch(value)
    }, 300)

    return (
        <main className="mt-10 w-full px-4 md:px-10">
            <div className="mb-6">
                <h1 className="text-xl font-bold tracking-tight text-white">Warehouse List</h1>
                <p className="text-zinc-500 mt-0.5 flex items-center gap-1.5 text-xs">
                    <Warehouse className="h-3 w-3" />
                    {count ?? 0} Total Warehouses
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
                <div className="flex-1 w-full">
                    <SearchbarWithFilter
                        onSearch={handleSearch}
                    />
                </div>

                <Button
                    onClick={() => router.push("/dashboard/warehouse/new")}
                    className="w-full md:w-auto bg-white hover:bg-zinc-200 text-black text-xs font-medium h-8 px-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                    <Plus className="mr-1.5 h-3.5 w-3.5 stroke-3" />
                    Add New Warehouse
                </Button>
            </div>

            {isLoading && (
                <div className="flex flex-col justify-center items-center py-20 gap-3">
                    <Loader2 className="h-5 w-5 text-zinc-600 animate-spin" />
                    <p className="text-zinc-500 text-xs animate-pulse">Syncing warehouse directory...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {warehouses.length > 0 ? (
                        warehouses.map((warehouse) => (
                            <div
                                key={warehouse.id}
                                className="flex items-center gap-3 bg-zinc-900/40 border-none rounded-xl p-4 hover:bg-zinc-900/80 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-full bg-zinc-800/50 shrink-0 flex items-center justify-center">
                                    <WarehouseIcon className="h-4 w-4 text-zinc-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold text-zinc-100 text-xs truncate leading-none">
                                            {warehouse.name}
                                        </p>
                                        <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded w-fit">
                                            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                            Operational
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => router.push(`/dashboard/warehouse/${warehouse.id}`)}
                                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 border-none rounded-lg h-8 px-3 text-xs"
                                >
                                    Details
                                    <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
                            <Warehouse className="h-8 w-8 text-zinc-700 mb-3" />
                            <p className="text-zinc-400 text-sm font-medium">Your warehouse list is empty</p>
                            <p className="text-zinc-600 text-xs mt-0.5">Click &#34;Add New Warehouse&#34; to register a location.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default WarehouseContent