import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

type ProductCardProps = {
    code: string
    price: number
    name: string
    stock: number
}

export const ProductCard = ({
    code,
    price,
    name,
    stock,
}: ProductCardProps) => {
    return (
        <Card className="w-80 rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
            <div className="h-60 bg-zinc-200 flex items-center justify-center">
                <Image
                    src="/globe.svg"
                    alt={name}
                    width={80}
                    height={80}
                    className="opacity-60"
                />
            </div>

            <CardContent className="px-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                        Code: {code}
                    </span>
                    <span className="text-white text-lg font-semibold">
                        ₹{price}
                    </span>
                </div>

                <CardTitle className="text-white text-2xl">
                    {name}
                </CardTitle>

                <CardDescription className="text-zinc-400">
                    In hand: {stock} items
                </CardDescription>
            </CardContent>

            <CardFooter className="px-4 pb-6 flex justify-end gap-2">
                <Button size="lg" variant="secondary">Delete</Button>
                <Button size="lg" variant="secondary">Update</Button>
            </CardFooter>
        </Card>
    )
}
