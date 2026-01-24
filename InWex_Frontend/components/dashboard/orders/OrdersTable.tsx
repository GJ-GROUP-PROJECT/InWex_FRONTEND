"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

type OrderStatus = "delivered" | "on-way" | "returned"

type Order = {
    id: string
    customer: string
    phone: string
    category: string
    price: number
    date: string
    payment: string
    status: OrderStatus
}

const orders: Order[] = [
    {
        id: "2334425",
        customer: "Gaurav Pandey",
        phone: "+91 84540 71187",
        category: "Laptops",
        price: 1234,
        date: "12.02.2025",
        payment: "Google Pay",
        status: "delivered",
    },
    {
        id: "2334426",
        customer: "Gaurav Pandey",
        phone: "+91 84540 71187",
        category: "Laptops",
        price: 1234,
        date: "12.02.2025",
        payment: "Google Pay",
        status: "on-way",
    },
    {
        id: "2334427",
        customer: "Gaurav Pandey",
        phone: "+91 84540 71187",
        category: "Laptops",
        price: 1234,
        date: "12.02.2025",
        payment: "Google Pay",
        status: "returned",
    },
]

const statusStyles = {
    delivered: "bg-green-500/20 text-green-400",
    "on-way": "bg-yellow-500/20 text-yellow-400",
    returned: "bg-red-500/20 text-red-400",
}

const headCell = "uppercase text-xs text-muted-foreground py-4"

const bodyRow = "border-0 hover:bg-white/5 [&>td]:py-5"

export const OrdersTable = () => {
    return (
        <div className="mt-12 rounded-2xl bg-[#1E1E1E] overflow-hidden">
            <Table className="border-collapse border-0">
                <TableHeader>
                    <TableRow className="bg-[#181818] hover:bg-[#181818]">
                        <TableHead className="w-12 pl-6 py-4">
                            <Checkbox />
                        </TableHead>

                        <TableHead className={headCell}>Order Number</TableHead>
                        <TableHead className={headCell}>Customer</TableHead>
                        <TableHead className={headCell}>Category</TableHead>
                        <TableHead className={headCell}>Price</TableHead>
                        <TableHead className={headCell}>Date</TableHead>
                        <TableHead className={headCell}>Payment</TableHead>
                        <TableHead className={headCell}>Status</TableHead>

                        <TableHead className="py-4" />
                    </TableRow>
                </TableHeader>


                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id} className={bodyRow}>
                            <TableCell className="pl-6">
                                <Checkbox />
                            </TableCell>


                            <TableCell className="font-medium">
                                {order.id}
                            </TableCell>

                            <TableCell>
                                <div className="flex flex-col leading-tight">
                                    <span className="font-medium">{order.customer}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {order.phone}
                                    </span>
                                </div>
                            </TableCell>


                            <TableCell>{order.category}</TableCell>
                            <TableCell>₹ {order.price}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.payment}</TableCell>

                            <TableCell>
                                <Badge
                                    className={`
                                        rounded-full px-3 py-1 text-xs capitalize
                                        ${statusStyles[order.status]}
                                    `}
                                >
                                    {order.status}
                                </Badge>

                            </TableCell>

                            <TableCell className="text-left">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View</DropdownMenuItem>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

