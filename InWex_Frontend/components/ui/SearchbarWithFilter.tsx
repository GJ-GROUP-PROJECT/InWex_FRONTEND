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
    onSearch?: (value: string) => void
}

const SearchbarWithFilter = ({ filters, onFilterSelect, onSearch }: SearchbarProps) => {
    return (
        <div className="flex gap-2 items-center w-full">
            <InputGroup className="bg-zinc-950 border-none w-full max-w-96 h-9 pl-3 rounded-lg focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
                <InputGroupInput
                    placeholder="Search"
                    className="text-xs placeholder:text-zinc-600 text-zinc-100 bg-transparent"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
                <InputGroupAddon>
                    <Search className="h-4! w-4! text-zinc-600" />
                </InputGroupAddon>
            </InputGroup>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className="h-9 px-4 cursor-pointer rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border-none transition-all flex items-center gap-1.5"
                    >
                        <Funnel className="h-3.5! w-3.5!" />
                        <span className="text-xs font-medium hidden xs:inline">Filter</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    sideOffset={6}
                    className="px-1 py-1 rounded-lg bg-zinc-950 text-zinc-100 border-none shadow-2xl min-w-36"
                >
                    {filters.map((item) => (
                        <DropdownMenuItem
                            key={item.value}
                            className="rounded-md cursor-pointer focus:bg-zinc-800 focus:text-white py-2 px-3 text-xs transition-colors"
                            onClick={() => onFilterSelect?.(item.value)}
                        >
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default SearchbarWithFilter