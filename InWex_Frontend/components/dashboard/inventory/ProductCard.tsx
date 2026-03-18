import Image from "next/image"
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
import { useAuth } from "@/contexts/AuthContext"

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { user, role } = useAuth()
    const router = useRouter()

    return (
        <Card className="w-full rounded-2xl overflow-hidden bg-[#121212] p-0 border-none flex flex-col group transition-all hover:border-zinc-700/50">
            <div className="relative h-60 bg-zinc-900/50 flex items-center justify-center overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    priority
                />
            </div>

            <CardContent className="flex-1 px-5 pt-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                    <span className="bg-zinc-800 text-zinc-400 font-medium px-2.5 py-1 rounded-lg border border-zinc-700/30">
                        Code: {product.sku}
                    </span>
                    <span className="text-white text-xl font-bold tracking-tight">
                        ₹{product.selling_price}
                    </span>
                </div>

                <div className="space-y-1">
                    <CardTitle className="text-white text-xl font-semibold truncate">
                        {product.name}
                    </CardTitle>

                    <CardDescription className="text-zinc-500 line-clamp-2 text-sm leading-relaxed">
                        {product.description || "No description available"}
                    </CardDescription>
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-zinc-400 text-xs font-medium">
                        Stock: {product.warehouse_stocks?.quantity || 1} units
                    </p>
                </div>
            </CardContent>

            <CardFooter className="px-5 pb-6 pt-2">
                <Button
                    onClick={() => (router.push(`/dashboard/inventory/products/${product.slug}`))}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none rounded-xl h-11 font-medium transition-colors"
                    variant="secondary"
                >
                    View Product
                </Button>
            </CardFooter>
        </Card>
    )
}