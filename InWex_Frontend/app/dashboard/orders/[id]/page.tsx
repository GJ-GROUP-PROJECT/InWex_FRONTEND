"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useOrder } from '@/contexts/OrderContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft,
    Package,
    Calendar,
    FileText,
    Loader2,
    Download,
} from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { OrderItems } from '@/lib/types/types'

const OrderDetailsPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const { orders, selectedOrder, fetchOrders, fetchOrderByReferenceId, isLoading, downloadOrder, shippingOrder, completeOrder } = useOrder()
    const [initializing, setInitializing] = useState(orders.length === 0)

    const currentOrder = orders.find(o => o.id === Number(id))
    const order = selectedOrder?.[0]

    useEffect(() => {
        if (orders.length === 0) {
            fetchOrders(false).finally(() => setInitializing(false))
        }
    }, [])

    useEffect(() => {
        if (currentOrder?.reference) {
            fetchOrderByReferenceId(currentOrder.reference, true)
        }
    }, [currentOrder?.reference, fetchOrderByReferenceId])

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
                <p className="text-zinc-500">Order not found</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    if (initializing || isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
            </div>
        )
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm w-fit"
                >
                    <ArrowLeft size={16} /> Back to Orders
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                            {order.reference}
                        </h1>
                        <p className="text-zinc-500 mt-1">Manage and track the details of this order.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                            onClick={async () => await downloadOrder(order.id)}
                        >
                            <Download className="w-4 h-4" />
                            Download Invoice
                        </Button>
                        <Button
                            className="bg-white text-black hover:bg-zinc-200"
                            onClick={async () => {
                                await shippingOrder(order.id)
                                await fetchOrderByReferenceId(order.reference, false)
                            }}
                        >
                            Ship Order
                        </Button>
                        <Button
                            className="bg-white text-black hover:bg-zinc-200"
                            onClick={async () => {
                                await completeOrder(order.id)
                                await fetchOrderByReferenceId(order.reference, false)
                            }}
                        >
                            Complete Order
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase font-bold tracking-widest">
                        <Package size={14} /> Status
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-full px-4">
                        {order.status}
                    </Badge>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase font-bold tracking-widest">
                        <Calendar size={14} /> Date Created
                    </div>
                    <p className="text-white font-medium">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit', month: 'long', year: 'numeric'
                        })}
                    </p>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase font-bold tracking-widest">
                        <FileText size={14} /> Order Type
                    </div>
                    <p className="text-white font-medium">{order.order_type}</p>
                </div>
            </div>

            {/* Items Table Section */}
            <div className="space-y-4 pt-4">
                <div className="flex items-baseline justify-between px-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Order Items</h3>
                    <span className="text-zinc-500 text-xs font-medium">
                        {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900/60 transition-none">
                                <TableHead className="h-12 pl-6 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Product Details</TableHead>
                                <TableHead className="h-12 text-zinc-500 uppercase text-[10px] font-bold tracking-widest text-center">SKU</TableHead>
                                <TableHead className="h-12 text-zinc-500 uppercase text-[10px] font-bold tracking-widest text-center">Unit Price</TableHead>
                                <TableHead className="h-12 text-zinc-500 uppercase text-[10px] font-bold tracking-widest text-right pr-6">Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item: OrderItems, idx: number) => (
                                <TableRow key={idx} className="border-zinc-800/50 hover:bg-white/3 transition-colors group">
                                    <TableCell className="pl-6 py-5">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-zinc-100 font-semibold text-sm group-hover:text-white transition-colors">
                                                {item.product.name}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">
                                                {item.product.unit_of_measure}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-zinc-400 font-mono text-xs text-center">
                                        {item.product.sku}
                                    </TableCell>
                                    <TableCell className="text-zinc-300 text-sm text-center">
                                        ₹{item.product.cost_price}
                                    </TableCell>
                                    <TableCell className="text-right pr-6 text-white font-bold text-base">
                                        {item.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Notes Section */}
            {order.notes && (
                <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl">
                    <h4 className="text-amber-500 text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                        <FileText size={14} /> Internal Notes
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{order.notes}</p>
                </div>
            )}
        </div>
    )
}

export default OrderDetailsPage