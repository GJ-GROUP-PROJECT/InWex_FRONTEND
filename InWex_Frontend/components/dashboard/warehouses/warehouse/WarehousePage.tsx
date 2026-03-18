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
        fetchProducts(warehouse.id, true);
    }, [fetchProducts, warehouse.id])

    return (
        <div className="mt-8 md:mt-12 w-full px-4 sm:px-6 md:px-10 pb-20 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Button>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-bold text-white tracking-tight">{warehouse.name}</h1>
                            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                Operational
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-500 text-sm">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> Created {new Date(warehouse.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span className="flex items-center gap-1.5"><Building2 size={14} /> ID: {warehouse.company}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/dashboard/warehouse/update/${warehouse.id}`)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border-none px-6"
                    >
                        <Edit3 className="mr-2 h-4 w-4" />
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
                        className="rounded-xl border-none px-6"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div className="flex flex-col justify-center items-center py-32 gap-4">
                    <Loader2 className="h-10 w-10 text-zinc-600 animate-spin" />
                    <p className="text-zinc-500 animate-pulse">Loading Warehouse Profile...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
                    <div className="xl:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Layers size={20} className="text-zinc-500" /> Infrastructure Sections
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {dummySections.map((section) => (
                                    <div key={section.id} className="p-6 bg-zinc-950 rounded-2xl border-none">
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Storage Zone</p>
                                        <p className="text-lg font-semibold text-zinc-100 mt-1">{section.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Users size={20} className="text-zinc-500" /> Personnel Assigned
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {dummyStaff.map((staff) => (
                                    <div key={staff.id} className="p-6 bg-zinc-900/40 rounded-2xl border-none group hover:bg-zinc-900/60 transition-colors">
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{staff.role}</p>
                                        <p className="text-lg font-semibold text-zinc-100 mt-1">{staff.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="xl:col-span-1 sticky top-10">
                        <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-900/50">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Package size={20} className="text-zinc-500" /> Inventory
                                </h2>
                                <Badge className="bg-zinc-900 text-zinc-400 border-zinc-800 rounded-full">
                                    {products.length ?? 0}
                                </Badge>
                            </div>

                            <div className="space-y-2 max-h-125 overflow-y-auto pr-2">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        < div
                                            key={product.id}
                                            className="flex items-center justify-between p-3 bg-zinc-900/30 rounded-xl hover:bg-zinc-900/50 transition-all cursor-pointer group border border-transparent hover:border-zinc-800"
                                            onClick={() => router.push(`/dashboard/inventory/products/${product.slug}`)}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="bg-zinc-800 p-1.5 rounded-lg text-zinc-500 group-hover:text-white transition-colors shrink-0">
                                                    <Package size={14} />
                                                </div>
                                                <span className="text-xs font-medium text-zinc-300 group-hover:text-white truncate">
                                                    {product.name}
                                                </span>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="text-xs font-bold text-white block">{product.warehouse_stocks?.quantity || 1}</span>
                                                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">qty</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center">
                                        <Package size={32} className="mx-auto text-zinc-800 mb-3" />
                                        <p className="text-zinc-500 text-xs text-balance">No products in this facility.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div >
            )}
        </div >
    )
}

export default WarehousePage