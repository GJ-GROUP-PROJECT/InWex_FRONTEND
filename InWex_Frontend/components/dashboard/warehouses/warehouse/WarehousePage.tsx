"use client"

import { Warehouse } from "@/lib/types/types"
import { Calendar, Layers, Loader2, Package, Users, Edit3, Trash2, ArrowLeft, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const dummySections = [
    { id: 1, name: "Refrigerated" },
    { id: 2, name: "Dry Goods" },
    { id: 3, name: "Electronics" },
]

const dummyStaff = [
    { id: 1, name: "John Doe", role: "Manager" },
    { id: 2, name: "Jane Smith", role: "Staff" },
    { id: 3, name: "Bob Johnson", role: "Staff" },
]

const WarehousePage = ({ warehouse }: { warehouse: Warehouse }) => {
    const { products, isLoading, error, fetchProducts, deleteWarehouse } = useWarehouse()
    const router = useRouter()

    useEffect(() => {
        fetchProducts(warehouse.id, true)
    }, [fetchProducts, warehouse.id])

    return (
        <div className="mt-6 md:mt-10 w-full px-4 sm:px-6 md:px-10 pb-16 space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit h-8 text-xs"
                    >
                        <ArrowLeft className="mr-1.5 h-3 w-3" />
                        Back to List
                    </Button>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-white tracking-tight">{warehouse.name}</h1>
                            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                                <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                Operational
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-500 text-xs">
                            <span className="flex items-center gap-1"><Calendar size={11} /> Created {new Date(warehouse.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span className="flex items-center gap-1"><Building2 size={11} /> ID: {warehouse.company}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/dashboard/warehouse/update/${warehouse.id}`)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border-none h-8 text-xs px-3"
                    >
                        <Edit3 className="mr-1.5 h-3 w-3" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (confirm("Are you sure?")) {
                                deleteWarehouse(warehouse.id)
                                router.push('/dashboard/warehouse')
                            }
                        }}
                        className="rounded-lg border-none h-8 text-xs px-3"
                    >
                        <Trash2 className="mr-1.5 h-3 w-3" />
                        Delete
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div className="flex flex-col justify-center items-center py-20 gap-3">
                    <Loader2 className="h-5 w-5 text-zinc-600 animate-spin" />
                    <p className="text-zinc-500 text-xs animate-pulse">Loading Warehouse Profile...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                    <div className="xl:col-span-2 space-y-6">

                        {/* Sections */}
                        <section>
                            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
                                <Layers size={14} className="text-zinc-500" /> Infrastructure Sections
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {dummySections.map((section) => (
                                    <div key={section.id} className="p-4 bg-zinc-950 rounded-xl border-none">
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Storage Zone</p>
                                        <p className="text-xs font-semibold text-zinc-100 mt-1">{section.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Staff */}
                        <section>
                            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
                                <Users size={14} className="text-zinc-500" /> Personnel Assigned
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {dummyStaff.map((staff) => (
                                    <div key={staff.id} className="p-4 bg-zinc-900/40 rounded-xl border-none group hover:bg-zinc-900/60 transition-colors">
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{staff.role}</p>
                                        <p className="text-xs font-semibold text-zinc-100 mt-1">{staff.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Inventory Sidebar */}
                    <aside className="xl:col-span-1 sticky top-10">
                        <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-900/50">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
                                    <Package size={13} className="text-zinc-500" /> Inventory
                                </h2>
                                <Badge className="bg-zinc-900 text-zinc-400 border-zinc-800 rounded-full text-[10px] px-2">
                                    {products.length ?? 0}
                                </Badge>
                            </div>

                            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center justify-between p-2.5 bg-zinc-900/30 rounded-lg hover:bg-zinc-900/50 transition-all cursor-pointer group border border-transparent hover:border-zinc-800"
                                            onClick={() => router.push(`/dashboard/inventory/products/${product.slug}`)}
                                        >
                                            <div className="flex items-center gap-2 min-w-0">
                                                <div className="bg-zinc-800 p-1 rounded-md text-zinc-500 group-hover:text-white transition-colors shrink-0">
                                                    <Package size={11} />
                                                </div>
                                                <span className="text-[10px] font-medium text-zinc-300 group-hover:text-white truncate">
                                                    {product.name}
                                                </span>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="text-[10px] font-bold text-white block">{product.total_stock || 1}</span>
                                                <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">qty</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center">
                                        <Package size={24} className="mx-auto text-zinc-800 mb-2" />
                                        <p className="text-zinc-500 text-xs">No products in this facility.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    )
}

export default WarehousePage