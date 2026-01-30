import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/lib/types"

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="opacity-60"
                />
            </div>

            <CardContent className="px-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                        Code: {product.sku}
                    </span>
                    <span className="text-white text-lg font-semibold">
                        ₹{product.selling_price}
                    </span>
                </div>

                <CardTitle className="text-white text-2xl">
                    {product.name}
                </CardTitle>

                <CardDescription className="text-zinc-400 line-clamp-2">
                    {product.description || "No description available"}
                </CardDescription>

                <CardDescription className="text-zinc-400">
                    In hand: {product.stock || 1} items
                </CardDescription>
            </CardContent>

            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                <Button size="lg" variant="secondary">Delete</Button>
                <Button size="lg" variant="secondary">Update</Button>
            </CardFooter>
        </Card>
    )
}
