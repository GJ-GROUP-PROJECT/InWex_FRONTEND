"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useOrder } from '@/contexts/OrderContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft, Package, Calendar, FileText, Loader2, Download,
} from 'lucide-react'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
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
                <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex h-[80vh] flex-col items-center justify-center gap-3">
                <p className="text-zinc-500 text-xs">Order not found</p>
                <Button onClick={() => router.back()} className="h-8 text-xs px-4">Go Back</Button>
            </div>
        )
    }

    if (initializing || isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs w-fit"
                >
                    <ArrowLeft size={12} /> Back to Orders
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {order.reference}
                        </h1>
                        <p className="text-zinc-500 mt-0.5 text-xs">Manage and track the details of this order.</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                            onClick={async () => await downloadOrder(order.id)}
                        >
                            <Download className="w-3.5! h-3.5! mr-1" />
                            Download Invoice
                        </Button>
                        <Button
                            size="sm"
                            className="h-8 text-xs bg-white text-black hover:bg-zinc-200"
                            onClick={async () => {
                                await shippingOrder(order.id)
                                await fetchOrderByReferenceId(order.reference, false)
                            }}
                        >
                            Ship Order
                        </Button>
                        <Button
                            size="sm"
                            className="h-8 text-xs bg-white text-black hover:bg-zinc-200"
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                        <Package size={11} /> Status
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-full px-3 text-[10px]">
                        {order.status}
                    </Badge>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                        <Calendar size={11} /> Date Created
                    </div>
                    <p className="text-white text-xs font-medium">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit', month: 'long', year: 'numeric'
                        })}
                    </p>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                        <FileText size={11} /> Order Type
                    </div>
                    <p className="text-white text-xs font-medium">{order.order_type}</p>
                </div>
            </div>

            {/* Items Table */}
            <div className="space-y-3 pt-2">
                <div className="flex items-baseline justify-between px-1">
                    <h3 className="text-sm font-bold text-white tracking-tight">Order Items</h3>
                    <span className="text-zinc-500 text-[10px] font-medium">
                        {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900/60 transition-none">
                                <TableHead className="h-9 pl-5 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Product Details</TableHead>
                                <TableHead className="h-9 text-zinc-500 uppercase text-[10px] font-bold tracking-widest text-center">SKU</TableHead>
                                <TableHead className="h-9 text-zinc-500 uppercase text-[10px] font-bold tracking-widest text-center">Unit Price</TableHead>
                                <TableHead className="h-9 text-zinc-500 uppercase text-[10px] font-bold tracking-widest text-right pr-5">Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item: OrderItems, idx: number) => (
                                <TableRow key={idx} className="border-zinc-800/50 hover:bg-white/3 transition-colors group">
                                    <TableCell className="pl-5 py-3">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-zinc-100 font-semibold text-xs group-hover:text-white transition-colors">
                                                {item.product.name}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">
                                                {item.product.unit_of_measure}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-zinc-400 font-mono text-[10px] text-center">
                                        {item.product.sku}
                                    </TableCell>
                                    <TableCell className="text-zinc-300 text-xs text-center">
                                        ₹{item.product.cost_price}
                                    </TableCell>
                                    <TableCell className="text-right pr-5 text-white font-bold text-xs">
                                        {item.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Notes */}
            {order.notes && (
                <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl">
                    <h4 className="text-amber-500 text-[10px] uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1.5">
                        <FileText size={11} /> Internal Notes
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">{order.notes}</p>
                </div>
            )}
        </div>
    )
}

export default OrderDetailsPage