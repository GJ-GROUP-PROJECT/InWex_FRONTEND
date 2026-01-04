import { NavbarLeft } from "@/components/Navbar/NavbarLeft"
import { OrdersTable } from "@/components/Orders/OrdersTable";
import { StatusCard } from "@/components/Orders/StatusCard"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Funnel, Plus, SearchIcon, SlidersHorizontal, Upload } from "lucide-react";

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

    return (
        <>
            <NavbarLeft>
                <h1 className="text-4xl font-medium">Orders</h1>
            </NavbarLeft>
            <main className="mt-12">
                <div className="flex flex-wrap gap-15">
                    {cardsContent.map((content) => (
                        <StatusCard key={content.title} {...content} />
                    ))}
                </div>

                <div className="mt-12 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex space-x-5 items-center">
                            <InputGroup className="border-none w-90 h-11 pl-4">
                                <InputGroupInput placeholder="Search" />
                                <InputGroupAddon>
                                    <SearchIcon className="h-5! w-5!" />
                                </InputGroupAddon>
                            </InputGroup>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" className="p-5! cursor-pointer">
                                        <Funnel className="h-4.5! w-4.5!" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" sideOffset={8} className="px-2 py-3 rounded-sm bg-zinc-900 text-white border-none">
                                    <DropdownMenuItem>Payment</DropdownMenuItem>
                                    <DropdownMenuItem>Date</DropdownMenuItem>
                                    <DropdownMenuItem>Price</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

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