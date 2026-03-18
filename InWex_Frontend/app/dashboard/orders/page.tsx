"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import OrdersTable from "@/components/dashboard/orders/OrdersTable"
import { StatusCard } from "@/components/dashboard/orders/StatusCard"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useOrder } from "@/contexts/OrderContext"
import { ShoppingCart, PackageSearch } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

type OrderStatus = "Requested" | "In_Progress" | "Delivered" | "Returned"

type StatusCardData = {
    title: string
    value: number
    status: OrderStatus
}

const Orders = () => {
    const { orders, fetchOrders, fetchOrderByReferenceId } = useOrder()
    const requested = orders?.filter(o => o.status === "Requested").length ?? 0
    const inProgress = orders?.filter(o => o.status === "In_Progress").length ?? 0
    const delivered = orders?.filter(o => o.status === "Delivered").length ?? 0
    const returned = orders?.filter(o => o.status === "Returned").length ?? 0

    const cardsContent: StatusCardData[] = [
        {
            title: "Requested Orders",
            value: requested,
            status: "Requested"
        },
        {
            title: "Returned Orders",
            value: returned,
            status: "Returned"
        },
        {
            title: "In-Progress Orders",
            value: inProgress,
            status: "In_Progress"
        },
        {
            title: "Delivered Orders",
            value: delivered,
            status: "Delivered"
        },
    ]

    // const handleSearch = useDebouncedCallback(async (value: string) => {
    //     if (!value.trim()) {
    //         fetchOrders(true)
    //         return
    //     }
    //     fetchOrderByReferenceId(value, true)
    // }, 300)

    return (
        <>
            <Navbar />

            <main className="mt-12 w-full px-4 md:px-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Orders Dashboard</h1>
                    <p className="text-zinc-500 mt-1 flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        {orders.length} Total Orders
                    </p>
                </div>

                {/* Status Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {cardsContent.map((content) => (
                        <StatusCard key={content.title} {...content} />
                    ))}
                </div>

                {/* Filter & Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 w-full max-w-2xl">
                        <SearchbarWithFilter
                            filters={[
                                { label: "Id", value: "id" },
                                { label: "Type", value: "type" },
                                { label: "Date Created", value: "date" }
                            ]}
                            onFilterSelect={(value) => console.log("Filter:", value)}
                        // onSearch={handleSearch}
                        />
                    </div>

                    <div className="hidden lg:flex items-center gap-2 text-zinc-500 text-sm">
                        <PackageSearch className="h-4 w-4" />
                        <span>Real-time sync active</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden">
                    <OrdersTable />
                </div>
            </main>
        </>
    )
}

export default Orders