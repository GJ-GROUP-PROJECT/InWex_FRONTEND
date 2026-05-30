"use client"

import { ProductCard } from "@/components/dashboard/inventory/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useProduct } from "@/contexts/ProductContext"
import { AlertTriangle, ChevronDown, Package, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductCardShimmer } from "./ProductCardShimmer"
import Quagga from "@ericblade/quagga2"
import { api } from "@/lib/api"
import { useDebouncedCallback } from "use-debounce"
import { toast } from "sonner"

const InventoryContent = () => {
    const [selected, setSelected] = useState("Product")
    const [showScanner, setShowScanner] = useState(false)
    const { products, count, isLoading, error, fetchProducts, fetchProductBySearch, fetchCategory, goToPage, goToNextPage, goToPrevPage, hasNext, hasPrev, total_pages, current_page } = useProduct()
    const router = useRouter()

    const options = [
        "Product",
        "Price: High To Low",
        "Price: Low to High",
    ]

    const pages = Array.from({ length: total_pages }, (_, i) => i + 1)

    useEffect(() => {
        fetchProducts(true)
        fetchCategory()
    }, [fetchProducts, fetchCategory])

    const sortedProducts = useMemo(() => {
        const arr = [...products]
        switch (selected) {
            case "Price: High To Low":
                return arr.sort((a, b) => Number(b.selling_price) - Number(a.selling_price))
            case "Price: Low to High":
                return arr.sort((a, b) => Number(a.selling_price) - Number(b.selling_price))
            default:
                return arr
        }
    }, [products, selected])

    const videoRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!showScanner || !videoRef.current) return

        Quagga.init({
            inputStream: {
                type: "LiveStream",
                target: videoRef.current,
                constraints: { facingMode: "environment" }
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, (err) => {
            if (err) {
                toast.error("Camera access denied or not available")
                setShowScanner(false)
                return
            }
            Quagga.start()
        })

        Quagga.onDetected(async (result) => {
            const barcode = result.codeResult.code
            if (!barcode || barcode.length !== 13) return

            Quagga.stop()
            setShowScanner(false)

            try {
                const res = await api.get(`/products/get-product-from-barcode?barcode=${barcode}`)
                router.push(`/dashboard/inventory/products/${res.data.slug}`)
            } catch {
                toast.error("Failed to fetch product from barcode")
            }
        })

        return () => { Quagga.stop() }
    }, [router, showScanner])

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            fetchProducts(true)
            return
        }
        fetchProductBySearch(value)
    }, 300)

    return (
        <main className="mt-6 md:mt-10 w-full px-4 sm:px-6 md:px-10 pb-8">

            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Product List</h1>
                    <p className="text-zinc-500 mt-0.5 flex items-center gap-1.5 text-xs">
                        <Package className="h-3 w-3" />
                        {count || 0} Total Items
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/dashboard/inventory/products/new")}
                    className="w-full lg:w-auto bg-white hover:bg-zinc-200 text-black text-xs font-medium h-8 px-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                    <Plus className="mr-1.5 h-3.5 w-3.5 stroke-3" />
                    Add New Product
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="w-full">
                    <SearchbarWithFilter
                        onSearch={handleSearch}
                    />
                </div>

                <Button onClick={() => setShowScanner(true)} className="h-8 text-xs px-4 rounded-lg shrink-0">
                    Scan Barcode
                </Button>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <p className="text-zinc-500 text-xs font-medium whitespace-nowrap hidden sm:block">Group By:</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                className="h-8 px-3 text-xs cursor-pointer rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border-none transition-all flex items-center gap-1.5 w-full md:w-auto justify-between"
                            >
                                {selected}
                                <ChevronDown className="h-3 w-3 opacity-70 text-zinc-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="bottom"
                            align="end"
                            sideOffset={6}
                            className="px-1 py-1 rounded-lg bg-zinc-950 text-zinc-100 border-none shadow-2xl min-w-36"
                        >
                            {options.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onClick={() => setSelected(option)}
                                    className="rounded-md cursor-pointer focus:bg-zinc-800 focus:text-white py-2 px-3 text-xs transition-colors"
                                >
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ProductCardShimmer key={index} />
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex justify-center items-center py-16 border-2 border-dashed border-red-900/30 rounded-2xl bg-red-950/10">
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
                            <div className="bg-red-500/10 rounded-full p-3">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-red-400 font-semibold text-sm">Failed to load inventory</p>
                                <p className="text-red-500/70 text-xs max-w-xs">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Products */}
            {!isLoading && !error && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-zinc-800 rounded-2xl">
                                <div className="bg-zinc-900/50 rounded-full p-4 mb-3 border border-zinc-800">
                                    <Package className="h-6 w-6 text-zinc-500" />
                                </div>
                                <p className="text-zinc-300 font-medium text-sm">No products found</p>
                                <p className="text-zinc-600 text-xs mt-0.5">Try adjusting your filters or add a new product.</p>
                            </div>
                        )}
                    </div>

                    {sortedProducts.length > 0 && total_pages > 1 && (
                        <div className="mt-8 mb-2 flex justify-center items-center">
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
                                                className="cursor-pointer rounded-lg border-none active:bg-zinc-800 text-xs"
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

            {/* Scanner */}
            {showScanner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="relative">
                        <div ref={videoRef} className="rounded-xl w-72 h-52 overflow-hidden" />
                        <Button
                            onClick={() => setShowScanner(false)}
                            className="absolute top-2 right-2 h-7 text-xs px-3"
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