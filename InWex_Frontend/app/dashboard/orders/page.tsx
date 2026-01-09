"use client"

import Navbar from "@/components/Navbar/Navbar";
import { OrdersTable } from "@/components/Orders/OrdersTable";
import { StatusCard } from "@/components/Orders/StatusCard"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Searchbar from "@/components/ui/Searchbar";
import { Plus, SlidersHorizontal, Upload } from "lucide-react";

const Orders = () => {
    type Trend = "up" | "down";

    type StatusCardData = {
        title: string;
        value: number;
        percentage: number;
        trend: Trend;
    };

    const cardsContent: StatusCardData[] = [
        {
            title: "New Orders",
            value: 21,
            percentage: 2.69,
            trend: "down",
        },
        {
            title: "Returned Orders",
            value: 8,
            percentage: 4.2,
            trend: "up",
        },
        {
            title: "On-Way Orders",
            value: 57,
            percentage: 1.12,
            trend: "down",
        },
        {
            title: "Delivery Orders",
            value: 21,
            percentage: 2.69,
            trend: "down",
        },
    ];

    const navbarLeftContent = (
        <h1 className="text-4xl font-medium">Orders</h1>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />
            <main className="mt-12">
                <div className="flex flex-wrap gap-15">
                    {cardsContent.map((content) => (
                        <StatusCard key={content.title} {...content} />
                    ))}
                </div>

                <div className="mt-12 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <Searchbar
                            filters={[
                                { label: "Payment", value: "payment" },
                                { label: "Date", value: "date" },
                                { label: "Price", value: "price" }
                            ]}
                            onFilterSelect={(value) => console.log("Products filter:", value)}
                        />

                        <div className="flex items-center gap-4">

                            <p className="text-sm text-zinc-400">123 orders</p>

                            <Button variant="secondary" className="gap-2 p-5! cursor-pointer">
                                <Upload className="h-4 w-4" />
                                Export
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" className="gap-2 p-5! cursor-pointer">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        Sort: default
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" sideOffset={8} className="px-2 py-3 rounded-sm bg-zinc-900 text-white border-none">
                                    <DropdownMenuItem>Newest</DropdownMenuItem>
                                    <DropdownMenuItem>Oldest</DropdownMenuItem>
                                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button className="gap-2 py-5! px-3! cursor-pointer">
                                <Plus className="h-4 w-4" />
                                Add Orders
                            </Button>

                        </div>
                    </div>
                </div>

                <OrdersTable />
            </main>
        </>
    )
}

export default Orders