"use client"

import { Funnel, Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Button } from "./button"

type FilterItem = {
    label: string
    value: string
}

type SearchbarProps = {
    filters: FilterItem[]
    onFilterSelect?: (value: string) => void
}

const Searchbar = ({ filters, onFilterSelect }: SearchbarProps) => {
    return (
        <div className="flex space-x-5 items-center">
            <InputGroup className="border-none w-90 h-11 pl-4">
                <InputGroupInput placeholder="Search" />
                <InputGroupAddon>
                    <Search className="h-5! w-5!" />
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
                    {filters.map((item) => (
                        <DropdownMenuItem
                            key={item.value}
                            onClick={() => onFilterSelect?.(item.value)}
                        >{item.label}</DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Searchbar

// < DropdownMenuItem > Code</DropdownMenuItem >
//                 <DropdownMenuItem>Name</DropdownMenuItem>
//                 <DropdownMenuItem>Price</DropdownMenuItem>