"use client"

import { AlertCircle, Package, ArrowUpRight, MapPin } from "lucide-react"
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

        await addOrder({ ...pendingOrder, address: addressString })
        clearPendingOrder()
        router.push("/dashboard/orders")
    }

    return (
        <main className="mt-10 w-full px-4 md:px-10">

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-0.5">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Finalize Stock Out</h1>
                    <Badge className="bg-amber-500/10 text-amber-500 border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Outbound
                    </Badge>
                </div>
                <p className="text-zinc-500 flex items-center gap-1.5 text-xs">
                    <Package className="h-3 w-3" />
                    Review and authorize the warehouse dispatch
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Side */}
                <div className="lg:col-span-7 space-y-6 pb-16">

                    {/* Draft notice */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/40 border border-dashed border-zinc-800">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Draft — reference ID assigned after submission</p>
                    </div>

                    {/* Address */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <MapPin size={13} />
                            <h3 className="font-semibold uppercase tracking-widest text-[10px]">Destination Address</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-1.5">
                                <Label className="text-zinc-500 ml-1 text-[10px]">Street Address / Landmark</Label>
                                <Input
                                    placeholder="123 Business Park, Main Road"
                                    className="bg-zinc-900/40 border-none h-8 text-xs rounded-lg focus:ring-1 ring-zinc-700"
                                    value={address.street}
                                    onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-zinc-500 ml-1 text-[10px]">District / City</Label>
                                <Input
                                    placeholder="Mumbai"
                                    className="bg-zinc-900/40 border-none h-8 text-xs rounded-lg focus:ring-1 ring-zinc-700"
                                    value={address.city}
                                    onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-zinc-500 ml-1 text-[10px]">State</Label>
                                    <Input
                                        placeholder="MH"
                                        className="bg-zinc-900/40 border-none h-8 text-xs rounded-lg focus:ring-1 ring-zinc-700"
                                        value={address.state}
                                        onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-zinc-500 ml-1 text-[10px]">Pincode</Label>
                                    <Input
                                        placeholder="400001"
                                        className="bg-zinc-900/40 border-none h-8 text-xs rounded-lg font-mono focus:ring-1 ring-zinc-700"
                                        value={address.pincode}
                                        onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Products Table */}
                    <section className="space-y-3">
                        <h3 className="font-semibold uppercase tracking-widest text-[10px] text-zinc-400 ml-1">Dispatched Products</h3>
                        <div className="rounded-xl bg-zinc-900/20 border border-zinc-900 overflow-hidden">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-zinc-900/40 text-zinc-500">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-[10px] uppercase tracking-widest">Product</th>
                                        <th className="px-4 py-3 font-medium text-[10px] uppercase tracking-widest text-right">Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900">
                                    {pendingOrder?.items?.map((item, i) => {
                                        const product = productCache[item.product]
                                        return (
                                            <tr key={i} className="hover:bg-zinc-900/40 transition-colors group">
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold text-zinc-100 uppercase tracking-tight text-xs">
                                                        {product?.name ?? "Unknown product"}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                                                        ID-{item.product}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono font-bold text-amber-500 text-xs">
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

                {/* Right Side: Summary */}
                <div className="lg:col-span-5">
                    <div className="sticky top-10 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 p-5 backdrop-blur-sm space-y-5">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-sm font-bold text-white">Order Summary</h3>
                                <p className="text-zinc-500 text-[10px] mt-0.5 uppercase tracking-tighter">Stock Depletion</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Total Items</p>
                                <p className="text-xl font-mono font-black text-white">
                                    {totalUnits.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <Separator className="bg-zinc-800/50" />

                        <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                            <div className="flex items-center gap-1.5 text-amber-500">
                                <AlertCircle size={12} />
                                <p className="text-[10px] font-bold uppercase tracking-widest">Verification Required</p>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Confirming this dispatch will permanently remove these units from the <strong>Warehouse</strong> records.
                            </p>
                        </div>

                        <div className="space-y-2 pt-2">
                            <Button
                                onClick={handleConfirm}
                                className="w-full h-10 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 text-xs transition-all active:scale-[0.98]"
                            >
                                Confirm Dispatch
                            </Button>

                            <div className="flex justify-center w-full">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.back()}
                                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 rounded-lg px-6 text-xs transition-all h-8"
                                >
                                    <ArrowUpRight className="mr-1.5 h-3 w-3" />
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