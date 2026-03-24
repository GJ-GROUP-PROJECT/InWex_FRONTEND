"use client"

import Image from "next/image"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/lib/types/types"
import { useRouter } from "next/navigation"

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter()
    const stock = product.total_stock ?? 0
    const isLowStock = stock < 10

    return (
        <Card className="w-full rounded-xl overflow-hidden bg-[#121212] p-0 border-none flex flex-col group transition-all hover:border-zinc-700/50">
            <div className="relative h-40 bg-zinc-900/50 flex items-center justify-center overflow-hidden">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                ) : (
                    <Package className="h-10 w-10 text-zinc-700" />
                )}
            </div>

            <CardContent className="flex-1 px-4 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="bg-zinc-800 text-zinc-400 font-medium px-2 py-0.5 rounded-md border border-zinc-700/30 text-[10px]">
                        {product.sku}
                    </span>
                    <span className="text-white text-sm font-bold tracking-tight">
                        ₹{product.selling_price}
                    </span>
                </div>

                <div className="space-y-0.5">
                    <CardTitle className="text-white text-sm font-semibold truncate">
                        {product.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-500 line-clamp-2 text-xs leading-relaxed">
                        {product.description || "No description available"}
                    </CardDescription>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${isLowStock ? "bg-orange-500" : "bg-emerald-500"}`} />
                        <p className={`text-[10px] font-medium ${isLowStock ? "text-orange-400" : "text-zinc-400"}`}>
                            Stock: {stock} units
                        </p>
                    </div>
                    {product.is_perishable && (
                        <span className="text-[10px] text-amber-500 font-medium">Perishable</span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="px-4 pb-4 pt-2">
                <Button
                    onClick={() => router.push(`/dashboard/inventory/products/${product.slug}`)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none rounded-lg h-8 text-xs font-medium transition-colors"
                    variant="secondary"
                >
                    View Product
                </Button>
            </CardFooter>
        </Card>
    )
}