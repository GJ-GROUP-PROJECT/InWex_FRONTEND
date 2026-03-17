"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import OrdersTable from "@/components/dashboard/orders/OrdersTable"
import { StatusCard } from "@/components/dashboard/orders/StatusCard"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { ShoppingCart, PackageSearch } from "lucide-react"

type Trend = "up" | "down";

type StatusCardData = {
    title: string;
    value: number;
    percentage: number;
    trend: Trend;
}

const Orders = () => {
    const cardsContent: StatusCardData[] = [
        { title: "New Orders", value: 21, percentage: 2.69, trend: "down" },
        { title: "Returned Orders", value: 8, percentage: 4.2, trend: "up" },
        { title: "On-Way Orders", value: 57, percentage: 1.12, trend: "down" },
        { title: "Delivery Orders", value: 21, percentage: 2.69, trend: "down" },
    ]

    return (
        <>
            <Navbar />

            <main className="mt-12 w-full px-4 md:px-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Orders Dashboard</h1>
                    <p className="text-zinc-500 mt-1 flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        123 Total Orders Processing
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
                        // onSearch={(val) => handleSearch(val)} // Add a debounce search
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