"use client"

import { NavbarLeft } from "@/components/NavbarLeft"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { ChevronDown, Ellipsis, Funnel, Menu, Plus, SearchIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const Inventory = () => {
    const [selected, setSelected] = useState("Product")

    const options = [
        "Product",
        "Warehouse",
        "High To Low Price",
        "Low to High Price",
    ]

    return (
        <>
            <NavbarLeft>
                <h1 className="text-[51px] font-medium">Inventory</h1>
            </NavbarLeft>

            <main className="mt-15">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-semibold">Product List</h1>
                        <p>123 Total Items</p>
                    </div>
                    <div>
                        <Button variant="secondary" className="p-5! pr-6! cursor-pointer">
                            <Plus />
                            Add New Product
                        </Button>
                    </div>
                </div>
                <div className="my-10 flex justify-between items-center">
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
                                <DropdownMenuItem>Code</DropdownMenuItem>
                                <DropdownMenuItem>Name</DropdownMenuItem>
                                <DropdownMenuItem>Price</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex space-x-8 items-center">
                        <div className="flex space-x-4 items-center">
                            <p>Grouped By :</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" className="p-5! cursor-pointer">
                                        {selected}
                                        <ChevronDown className="h-4 w-4 opacity-70" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end" sideOffset={8} className="px-4 py-3 rounded-lg bg-zinc-900 text-white border-none">
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
                        <div className="space-x-2 items-center">
                            <Button variant="secondary" size="icon-lg" className="cursor-pointer">
                                <Ellipsis className="h-5! w-5!" />
                            </Button>
                            <Button variant="secondary" size="icon-lg" className="cursor-pointer">
                                <Menu className="h-4.5! w-4.5!" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-8">
                    <div>
                        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
                            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                                <Image
                                    src="/globe.svg"
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </div>
                            <CardContent className="px-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                                        Code: 123
                                    </span>
                                    <span className="text-white text-lg font-semibold">₹123</span>
                                </div>

                                <CardTitle className="text-white text-2xl">
                                    Product Name
                                </CardTitle>

                                <CardDescription className="text-zinc-400">
                                    In hand: 300 items
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                                <Button size="lg" variant="secondary">delete</Button>
                                <Button size="lg" variant="secondary">update</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
                            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                                <Image
                                    src="/globe.svg"
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </div>
                            <CardContent className="px-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                                        Code: 123
                                    </span>
                                    <span className="text-white text-lg font-semibold">₹123</span>
                                </div>

                                <CardTitle className="text-white text-2xl">
                                    Product Name
                                </CardTitle>

                                <CardDescription className="text-zinc-400">
                                    In hand: 300 items
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                                <Button size="lg" variant="secondary">delete</Button>
                                <Button size="lg" variant="secondary">update</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
                            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                                <Image
                                    src="/globe.svg"
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </div>
                            <CardContent className="px-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                                        Code: 123
                                    </span>
                                    <span className="text-white text-lg font-semibold">₹123</span>
                                </div>

                                <CardTitle className="text-white text-2xl">
                                    Product Name
                                </CardTitle>

                                <CardDescription className="text-zinc-400">
                                    In hand: 300 items
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                                <Button size="lg" variant="secondary">delete</Button>
                                <Button size="lg" variant="secondary">update</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
                            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                                <Image
                                    src="/globe.svg"
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </div>
                            <CardContent className="px-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                                        Code: 123
                                    </span>
                                    <span className="text-white text-lg font-semibold">₹123</span>
                                </div>

                                <CardTitle className="text-white text-2xl">
                                    Product Name
                                </CardTitle>

                                <CardDescription className="text-zinc-400">
                                    In hand: 300 items
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                                <Button size="lg" variant="secondary">delete</Button>
                                <Button size="lg" variant="secondary">update</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
                            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                                <Image
                                    src="/globe.svg"
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </div>
                            <CardContent className="px-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                                        Code: 123
                                    </span>
                                    <span className="text-white text-lg font-semibold">₹123</span>
                                </div>

                                <CardTitle className="text-white text-2xl">
                                    Product Name
                                </CardTitle>

                                <CardDescription className="text-zinc-400">
                                    In hand: 300 items
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                                <Button size="lg" variant="secondary">delete</Button>
                                <Button size="lg" variant="secondary">update</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
                            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                                <Image
                                    src="/globe.svg"
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </div>
                            <CardContent className="px-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                                        Code: 123
                                    </span>
                                    <span className="text-white text-lg font-semibold">₹123</span>
                                </div>

                                <CardTitle className="text-white text-2xl">
                                    Product Name
                                </CardTitle>

                                <CardDescription className="text-zinc-400">
                                    In hand: 300 items
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                                <Button size="lg" variant="secondary">delete</Button>
                                <Button size="lg" variant="secondary">update</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Inventory