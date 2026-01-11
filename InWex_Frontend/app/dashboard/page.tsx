"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, ChevronDown, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
    const [today, setToday] = useState("")

    useEffect(() => {
        const current = new Date()
        const weekday = current.toLocaleString("en-US", { weekday: "short" });
        const day = current.getDate();
        const month = current.toLocaleString("en-US", { month: "short" });

        setToday(`${weekday} ${day} ${month}`);
    }, [])

    const [selected, setSelected] = useState("This month")

    const options = [
        "This month",
        "Last month",
        "3 months",
        "6 months",
        "1 year",
        "All time"
    ]

    const [date, setDate] = useState<Date | undefined>(new Date())

    const navbarLeftContent = (
        <div className="flex items-center space-x-4">
            <InputGroup className="border-none w-90 h-11 pl-4">
                <InputGroupInput placeholder="Search" />
                <InputGroupAddon>
                    <SearchIcon className="h-5! w-5!" />
                </InputGroupAddon>
            </InputGroup>
            <p className="text-sm">Today, {today}</p>
        </div>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />

            <main className="mt-12">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Hello, Gayrav!</h1>
                        <p>Wats Up Ma Nigga?</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 rounded-sm bg-zinc-900 px-4.5 py-2.5 text-sm text-white shadow-md hover:bg-zinc-800">
                                        {selected}
                                        <ChevronDown className="h-4 w-4 opacity-70" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" sideOffset={8} className="px-4 py-3 rounded-lg bg-zinc-900 text-white border-none">
                                    {options.map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onClick={() => setSelected(option)}
                                            className="cursor-pointer focus:bg-zinc-800"
                                        >
                                            {option}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="secondary" size="icon-lg">
                                    <CalendarDays className="h-4.5! w-4.5!" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="mt-14">
                    {/* Cards Display */}
                </div>
            </main >
        </>
    )
}

export default Dashboard