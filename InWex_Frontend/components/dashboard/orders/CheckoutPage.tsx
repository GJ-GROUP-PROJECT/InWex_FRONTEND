"use client"

import {
    AlertCircle,
    Package,
    ArrowUpRight,
    MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useOrder } from "@/contexts/OrderContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const StockOutCheckout = () => {
    const { pendingOrder, productCache, addOrder, clearPendingOrder } = useOrder()
    const router = useRouter()

    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
    })

    const totalUnits = pendingOrder?.items?.reduce((acc, item) => acc + Number(item.quantity || 0), 0) ?? 0

    const handleConfirm = async () => {
        if (!pendingOrder) return toast.error("No order found")
        if (!address.street || !address.city || !address.state || !address.pincode) {
            return toast.error("Please fill in the destination address")
        }

        const addressString = `Address: ${address.street}, City: ${address.city}, State: ${address.state}, Pincode: ${address.pincode}`

        await addOrder({
            ...pendingOrder,
            address: addressString,
        })

        clearPendingOrder()
        router.push("/dashboard/orders")
    }
    return (
        <main className="mt-12 w-full px-4 md:px-10">

            {/* Header Section */}
            <div className="mb-10">
                <div>
                    <div className="flex items-center gap-4 mb-1">
                        <h1 className="text-4xl font-bold tracking-tight text-white">Finalize Stock Out</h1>
                        <Badge className="bg-amber-500/10 text-amber-500 border-none px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Outbound
                        </Badge>
                    </div>
                    <p className="text-zinc-500 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Review and authorize the warehouse dispatch
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: Forms & Table */}
                <div className="lg:col-span-7 space-y-10 pb-20">

                    {/* Reference (Read Only from Backend) */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800">
                        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Draft — reference ID assigned after submission</p>
                    </div>

                    {/* Address Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-zinc-400">
                            <MapPin size={18} />
                            <h3 className="font-semibold uppercase tracking-widest text-xs">Destination Address</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <Label className="text-zinc-500 ml-1 text-xs">Street Address / Landmark</Label>
                                <Input
                                    placeholder="123 Business Park, Main Road"
                                    className="bg-zinc-900/40 border-none h-12 rounded-2xl focus:ring-1 ring-zinc-700"
                                    value={address.street}
                                    onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-500 ml-1 text-xs">District / City</Label>
                                <Input
                                    placeholder="Mumbai"
                                    className="bg-zinc-900/40 border-none h-12 rounded-2xl focus:ring-1 ring-zinc-700"
                                    value={address.city}
                                    onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-500 ml-1 text-xs">State</Label>
                                    <Input
                                        placeholder="MH"
                                        className="bg-zinc-900/40 border-none h-12 rounded-2xl focus:ring-1 ring-zinc-700"
                                        value={address.state}
                                        onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-500 ml-1 text-xs">Pincode</Label>
                                    <Input
                                        placeholder="400001"
                                        className="bg-zinc-900/40 border-none h-12 rounded-2xl font-mono focus:ring-1 ring-zinc-700"
                                        value={address.pincode}
                                        onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Table Section */}
                    <section className="space-y-4">
                        <h3 className="font-semibold uppercase tracking-widest text-xs text-zinc-400 ml-1">Dispatched Products</h3>
                        <div className="rounded-3xl bg-zinc-900/20 border border-zinc-900 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-900/40 text-zinc-500">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Product</th>
                                        <th className="px-6 py-4 font-medium text-right">Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900">
                                    {pendingOrder?.items?.map((item, i) => {
                                        const product = productCache[item.product]
                                        return (
                                            <tr key={i} className="hover:bg-zinc-900/40 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <p className="font-semibold text-zinc-100 uppercase tracking-tight">
                                                        {product?.name ?? "Unknown product"}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                                                        ID-{item.product}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5 text-right font-mono font-bold text-amber-500">
                                                    - {item.quantity}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="sticky top-12 rounded-[2.5rem] bg-zinc-900/40 border-none p-8 backdrop-blur-sm space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-white">Order Summary</h3>
                                <p className="text-zinc-500 text-xs mt-1 uppercase tracking-tighter">Stock Depletion</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Total Items</p>
                                <p className="text-2xl font-mono font-black text-white">
                                    {totalUnits.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <Separator className="bg-zinc-800/50" />

                        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                            <div className="flex items-center gap-2 text-amber-500">
                                <AlertCircle size={16} />
                                <p className="text-xs font-bold uppercase tracking-widest">Verification Required</p>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Confirming this dispatch will permanently remove these units from the <strong>Warehouse</strong> records.
                            </p>
                        </div>

                        <div className="space-y-3 pt-4">
                            <Button
                                onClick={handleConfirm}
                                className="w-full h-16 rounded-2xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 text-lg transition-all active:scale-[0.98]"
                            >
                                Confirm Dispatch
                            </Button>

                            <div className="flex justify-center w-full">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.back()}
                                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 rounded-xl px-8 transition-all"
                                >
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Return to Orders
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default StockOutCheckout