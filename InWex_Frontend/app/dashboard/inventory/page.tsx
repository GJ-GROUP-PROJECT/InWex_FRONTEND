"use client"

import { ProductCard } from "@/components/dashboard/inventory/ProductCard"
import Navbar from "@/components/dashboard/Navbar";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Searchbar from "@/components/ui/Searchbar"
import { useProduct } from "@/contexts/ProductContext";
import { ChevronDown, Ellipsis, Menu, Plus } from "lucide-react"
import { useState } from "react"

const Inventory = () => {
    const [selected, setSelected] = useState("Product")
    const { products, isLoading, error } = useProduct()

    const options = [
        "Product",
        "Warehouse",
        "Price: High To Low",
        "Price: Low to High",
    ]

    const navbarLeftContent = (
        <h1 className="text-4xl font-medium">Inventory</h1>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />

            <main className="mt-12">
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
                    <Searchbar
                        filters={[
                            { label: "Product Code", value: "code" },
                            { label: "Product Name", value: "name" },
                            { label: "Price", value: "price" }
                        ]}
                        onFilterSelect={(value) => console.log("Products filter:", value)}
                    />

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
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-lg text-muted-foreground">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-lg text-red-500">{error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="flex flex-wrap gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="w-full flex justify-center items-center py-20">
                                <p className="text-lg text-muted-foreground">No products found</p>
                            </div>
                        )}
                    </div>
                )}
            </main >
        </>
    )
}

export default Inventory