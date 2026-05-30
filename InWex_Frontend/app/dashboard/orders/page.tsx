"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import OrdersTable from "@/components/dashboard/orders/OrdersTable"
import { StatusCard } from "@/components/dashboard/orders/StatusCard"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useOrder } from "@/contexts/OrderContext"
import { ShoppingCart, PackageSearch } from "lucide-react"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

type OrderStatus = "Requested" | "In_Progress" | "Delivered" | "Returned"

type StatusCardData = {
    title: string
    value: number
    status: OrderStatus
}

const Orders = () => {
    const { orderStatusCount, count, fetchOrders, fetchOrderByClientId, fetchOrderStatusCount } = useOrder()

    useEffect(() => {
        fetchOrderStatusCount()
    }, [])


    const cardsContent: StatusCardData[] = [
        { title: "Requested Orders", value: orderStatusCount.request, status: "Requested" },
        { title: "Returned Orders", value: orderStatusCount.return, status: "Returned" },
        { title: "In-Progress Orders", value: orderStatusCount.in_progress, status: "In_Progress" },
        { title: "Delivered Orders", value: orderStatusCount.delivered, status: "Delivered" },
    ]

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            fetchOrders(true)
            return
        }
        fetchOrderByClientId(value, true)
    }, 300)

    return (
        <>
            <Navbar />

            <main className="mt-10 w-full px-4 md:px-10">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Orders Dashboard</h1>
                    <p className="text-zinc-500 mt-0.5 flex items-center gap-1.5 text-xs">
                        <ShoppingCart className="h-3 w-3" />
                        {count} Total Orders
                    </p>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {cardsContent.map((content) => (
                        <StatusCard key={content.title} {...content} />
                    ))}
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex-1 w-full max-w-xl">
                        <SearchbarWithFilter
                            onSearch={handleSearch}
                        />
                    </div>

                    <div className="hidden lg:flex items-center gap-1.5 text-zinc-500 text-xs">
                        <PackageSearch className="h-3 w-3" />
                        <span>Real-time sync active</span>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden">
                    <OrdersTable />
                </div>
            </main>
        </>
    )
}

export default Orders