"use client"

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Loader2, AlertCircle, ExternalLink, FileText, Trash } from "lucide-react"
import { useOrder } from "@/contexts/OrderContext"
import { useEffect, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const OrdersTable = () => {
    const { orders, isLoading, error, fetchOrders, downloadOrder, deleteOrder, nextUrl, isFetchingMore, loadMore, selectOrder } = useOrder()
    const router = useRouter()
    const sentinelRef = useRef<HTMLDivElement>(null)

    const statusStyles = {
        Requested: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        In_Progress: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        Delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        Returned: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        Cancelled: "bg-zinc-500/10 text-zinc-500 border-zinc-200/20",
    }

    const headCell = "uppercase text-[10px] font-bold tracking-widest text-zinc-500 py-3"

    useEffect(() => {
        fetchOrders(true)
    }, [fetchOrders])

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextUrl && !isFetchingMore) loadMore()
            },
            { threshold: 0.1 }
        )
        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [nextUrl, isFetchingMore, loadMore])

    return (
        <div className="mt-3 rounded-xl bg-zinc-900/40 border border-zinc-800 overflow-hidden min-h-60">
            <Table className="table-fixed w-full">
                <TableHeader>
                    <TableRow className="bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900/60">
                        <TableHead className={`${headCell} pl-5 w-[8%]`}>ID</TableHead>
                        <TableHead className={`${headCell} w-[18%]`}>Order ID</TableHead>
                        <TableHead className={`${headCell} w-[11%]`}>Type</TableHead>
                        <TableHead className={`${headCell} w-[13%]`}>Status</TableHead>
                        <TableHead className={`${headCell} w-[15%]`}>Client</TableHead>
                        <TableHead className={`${headCell} w-[10%]`}>Items</TableHead>
                        <TableHead className={`${headCell} w-[15%]`}>Date Created</TableHead>
                        <TableHead className="py-3 pr-5 text-right w-[10%]" />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="py-20">
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <Loader2 className="h-5 w-5 animate-spin text-white/50" />
                                    <p className="text-zinc-500 text-xs animate-pulse tracking-tight">Syncing orders...</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell colSpan={8} className="py-20">
                                <div className="flex flex-col items-center justify-center gap-2 text-rose-500/80">
                                    <AlertCircle className="h-5 w-5" />
                                    <p className="text-xs font-medium">Failed to load system data</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="border-zinc-800/50 hover:bg-white/2 transition-colors">
                                    <TableCell className="pl-5 py-3 font-mono text-zinc-300 text-xs">#{order.id}</TableCell>
                                    <TableCell className="py-3 font-mono text-zinc-300 text-xs">#{order.reference}</TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className="rounded-md text-[10px] font-medium border-zinc-800 text-zinc-400 bg-zinc-800/30">
                                            {order.order_type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${statusStyles[order.status]}`}>
                                            {order.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3 text-zinc-300 text-xs truncate">
                                        {order.client || <span className="text-zinc-600">—</span>}
                                    </TableCell>
                                    <TableCell className="py-3 text-zinc-400 text-xs">
                                        <span className="text-white font-medium">{order.items?.length || 0}</span> SKU(s)
                                    </TableCell>
                                    <TableCell className="py-3 text-zinc-500 text-xs">
                                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="pr-5 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-zinc-800 text-zinc-500">
                                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300 min-w-36">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        selectOrder(order.reference)
                                                        router.push(`/dashboard/orders/${order.id}`)
                                                    }}
                                                    className="gap-2 py-1.5 text-xs focus:bg-zinc-800 focus:text-white cursor-pointer"
                                                >
                                                    <ExternalLink size={12} className="text-zinc-500" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 py-1.5 text-xs focus:bg-zinc-800 focus:text-white cursor-pointer"
                                                    onClick={async () => await downloadOrder(order.id)}
                                                >
                                                    <FileText size={12} className="text-zinc-500" /> Download Invoice
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 py-1.5 text-xs text-rose-500 focus:bg-rose-500/10 focus:text-rose-500 cursor-pointer"
                                                    onClick={async () => {
                                                        if (confirm("Are you sure?")) {
                                                            await deleteOrder(order.id)
                                                            router.push('/dashboard/orders')
                                                        }
                                                    }}
                                                >
                                                    <Trash size={12} className="text-rose-500" />
                                                    Cancel Order
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {isFetchingMore && (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-600" />
                                            <p className="text-zinc-600 text-[10px] tracking-tight">Loading more...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    )}
                </TableBody>
            </Table>

            <div ref={sentinelRef} className="h-1" />
        </div>
    )
}

export default OrdersTable