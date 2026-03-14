"use client"

import { ProductCard } from "@/components/dashboard/inventory/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useProduct } from "@/contexts/ProductContext"
import { AlertTriangle, ChevronDown, Package, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductCardShimmer } from "./ProductCardShimmer"
import { BrowserMultiFormatReader } from '@zxing/library'
import { api } from "@/lib/api"
import { useDebouncedCallback } from "use-debounce"

const InventoryContent = () => {
    const [selected, setSelected] = useState("Product")
    const [showScanner, setShowScanner] = useState(false)
    const { products, count, isLoading, error, fetchProducts, fetchProductBySearch, fetchCategory, goToPage, goToNextPage, goToPrevPage, hasNext, hasPrev, total_pages, current_page } = useProduct()
    const router = useRouter()

    const options = [
        "Product",
        "Warehouse",
        "Price: High To Low",
        "Price: Low to High",
    ]

    const pages = Array.from({ length: total_pages }, (_, i) => i + 1)

    useEffect(() => {
        fetchProducts(true)
        fetchCategory()
    }, [fetchProducts, fetchCategory])

    const videoRef = useRef(null)

    useEffect(() => {
        if (!showScanner || !videoRef.current) return

        const codeReader = new BrowserMultiFormatReader()

        codeReader.decodeFromVideoDevice(null, videoRef.current, async (result) => {
            if (result) {
                codeReader.reset()
                const barcode = result.getText()

                const res = await api.get(`/products/get-product-from-barcode?barcode=${barcode}`)
                router.push(`/dashboard/inventory/products/${res.data.slug}`)
            }
        })

        return () => {
            codeReader.reset()
        }
    }, [router, showScanner])

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            fetchProducts(true)
            return
        }
        fetchProductBySearch(value)
    }, 300)

    return (
        <main className="mt-8 md:mt-12 w-full px-4 sm:px-6 md:px-10 pb-8">

            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Product List</h1>
                    <p className="text-zinc-500 mt-1 flex items-center gap-2 text-sm md:text-base">
                        <Package className="h-4 w-4" />
                        {count || 0} Total Items
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/dashboard/inventory/products/new")}
                    className="w-full lg:w-auto bg-white hover:bg-zinc-200 text-black font-medium px-8 py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                    <Plus className="mr-2 h-5 w-5 stroke-3" />
                    Add New Product
                </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div className="w-full">
                    <SearchbarWithFilter
                        filters={[
                            { label: "Product Code", value: "code" },
                            { label: "Product Name", value: "name" },
                            { label: "Price", value: "price" }
                        ]}
                        onFilterSelect={(value) => console.log("Products filter:", value)}
                        onSearch={handleSearch}
                    />
                </div>

                <Button onClick={() => setShowScanner(true)}>
                    Scan Barcode
                </Button>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                    <p className="text-zinc-500 text-sm font-medium whitespace-nowrap hidden sm:block">Group By:</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                className="h-11 px-5 cursor-pointer rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border-none transition-all flex items-center gap-2 w-full md:w-auto justify-between"
                            >
                                {selected}
                                <ChevronDown className="h-4 w-4 opacity-70 ml-2 text-zinc-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="bottom"
                            align="end"
                            sideOffset={8}
                            className="px-1.5 py-1.5 rounded-xl bg-zinc-950 text-zinc-100 border-none shadow-2xl min-w-45"
                        >
                            {options.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onClick={() => setSelected(option)}
                                    className="rounded-lg cursor-pointer focus:bg-zinc-800 focus:text-white py-2.5 px-3 text-sm transition-colors"
                                >
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductCardShimmer key={index} />
                    ))}
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center py-20 border-2 border-dashed border-red-900/30 rounded-3xl bg-red-950/10">
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                            <div className="bg-red-500/10 rounded-full p-4">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-red-400 font-semibold text-lg">Failed to load inventory</p>
                                <p className="text-red-500/70 text-sm max-w-xs">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {!isLoading && !error && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl">
                                <div className="bg-zinc-900/50 rounded-full p-5 mb-4 border border-zinc-800">
                                    <Package className="h-8 w-8 text-zinc-500" />
                                </div>
                                <p className="text-zinc-300 font-medium text-lg">No products found</p>
                                <p className="text-zinc-600 text-sm mt-1">Try adjusting your filters or add a new product.</p>
                            </div>
                        )}
                    </div>

                    {products.length > 0 && total_pages > 1 && (
                        <div className="mt-10 mb-2 flex justify-center items-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={goToPrevPage}
                                            className={!hasPrev ? "pointer-events-none opacity-20" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                    {pages.map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                className="cursor-pointer rounded-lg border-none active:bg-zinc-800"
                                                onClick={() => goToPage(page)}
                                                isActive={current_page === page}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={goToNextPage}
                                            className={!hasNext ? "pointer-events-none opacity-20" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}

            {showScanner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="relative">
                        <video ref={videoRef} className="rounded-xl w-80 h-60" />
                        <Button
                            onClick={() => setShowScanner(false)}
                            className="absolute top-2 right-2"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default InventoryContent