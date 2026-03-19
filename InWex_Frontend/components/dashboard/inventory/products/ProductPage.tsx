"use client"

import { Category, Product } from "@/lib/types/types"
import { Badge } from "@/components/ui/badge"
import { Package, Tag, Barcode, TrendingUp, Box, Calendar, Edit3, Trash2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProduct } from "@/contexts/ProductContext"
import { useRouter } from "next/navigation"

const ProductPage = ({ product, category }: { product: Product, category: Category }) => {
    const profit = Number(product.selling_price) - Number(product.cost_price)
    const margin = ((profit / Number(product.selling_price)) * 100).toFixed(1)
    const { deleteProduct } = useProduct()
    const router = useRouter()

    return (
        <div className="mt-6 md:mt-10 w-full px-4 sm:px-6 md:px-10 pb-16 space-y-6">

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/dashboard/inventory")}
                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit h-8 text-xs"
                >
                    <ArrowLeft className="mr-1.5 h-3 w-3" />
                    Back to Inventory
                </Button>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/dashboard/inventory/products/update/${product.id}`)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border-none h-8 text-xs flex-1 sm:flex-none"
                    >
                        <Edit3 className="mr-1.5 h-3 w-3" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (confirm("Are you sure?")) {
                                deleteProduct(product.id)
                                router.push('/dashboard/inventory')
                            }
                        }}
                        className="rounded-lg border-none h-8 text-xs px-4 flex-1 sm:flex-none"
                    >
                        <Trash2 className="mr-1.5 h-3 w-3" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

                {/* Product Image + Info */}
                <Card className="lg:col-span-1 bg-zinc-950 border-none rounded-xl overflow-hidden flex flex-col h-full">
                    <div className="aspect-square bg-zinc-900/30 flex items-center justify-center p-6 shrink-0">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="object-contain w-full h-full"
                                priority
                            />
                        ) : (
                            <Package size={48} className="text-zinc-800" />
                        )}
                    </div>
                    <CardContent className="p-5 space-y-4 grow flex flex-col justify-between">
                        <div className="space-y-2.5">
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-2.5 py-0.5 rounded-md text-[10px] w-fit">
                                {category.name}
                            </Badge>
                            <h1 className="text-xl font-bold text-white tracking-tight leading-tight">{product.name}</h1>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                {product.description || "No description available."}
                            </p>
                        </div>

                        <div className="pt-4 space-y-3 border-t border-zinc-900">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2"><Tag size={12} /> SKU</span>
                                <span className="text-zinc-300 font-mono bg-zinc-900/50 px-2 py-0.5 rounded text-[10px]">{product.sku}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2"><Barcode size={12} /> Barcode</span>
                                <span className="text-zinc-300 font-mono text-[10px]">{product.barcode || "null"}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2"><Box size={12} /> Unit</span>
                                <span className="text-zinc-300 font-medium text-[10px]">{product.unit_of_measure}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Side */}
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">

                    {/* Price Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
                        <Card className="bg-zinc-950 border-none p-5 rounded-xl flex flex-col justify-center h-32">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Cost Price</p>
                            <div className="flex items-baseline gap-1.5 mt-3">
                                <span className="text-2xl font-bold text-white">₹{product.cost_price}</span>
                                <span className="text-zinc-600 text-xs">/ unit</span>
                            </div>
                        </Card>

                        <Card className="bg-zinc-950 border-none p-5 rounded-xl flex flex-col justify-center h-32">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Selling Price</p>
                            <div className="flex items-baseline gap-1.5 mt-3">
                                <span className="text-2xl font-bold text-white">₹{product.selling_price}</span>
                                <span className="text-zinc-600 text-xs">/ unit</span>
                            </div>
                        </Card>
                    </div>

                    {/* Profit + Stock */}
                    <Card className="bg-zinc-950 border-none rounded-xl overflow-hidden flex flex-col pb-0">
                        <CardContent className="p-0 flex flex-col h-full divide-y divide-zinc-900/50">
                            <div className="p-5 flex items-center justify-between">
                                <div className="space-y-1.5">
                                    <p className="text-zinc-500 text-xs font-medium">Profit Margin</p>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <TrendingUp className="text-emerald-500" size={18} />
                                        {margin}%
                                    </p>
                                </div>
                                <div className="text-right space-y-1.5">
                                    <p className="text-zinc-500 text-xs font-medium">Net Profit</p>
                                    <p className="text-2xl font-bold text-emerald-500">₹{profit.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="p-5 flex items-center justify-between bg-zinc-900/10">
                                <div className="space-y-1.5">
                                    <p className="text-zinc-500 text-xs font-medium">Inventory Status</p>
                                    <p className={`text-xl font-bold ${product.total_stock < 10 ? "text-orange-500" : "text-white"}`}>
                                        {product.total_stock ?? 1} <span className="text-xs font-normal text-zinc-500 ml-1">Units in hand</span>
                                    </p>
                                </div>
                                <Badge className={`${product.total_stock < 10 ? "bg-orange-500/10 text-orange-500" : "bg-emerald-500/10 text-emerald-500"} border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                                    {product.total_stock < 10 ? "Low Stock" : "In Stock"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dates */}
                    <Card className="bg-zinc-950 border-none p-5 rounded-xl shrink-0">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                                    <Calendar size={10} /> Date Created
                                </p>
                                <p className="text-zinc-200 text-xs font-semibold">{new Date(product.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="space-y-1.5 text-right md:text-left">
                                <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 md:justify-start justify-end">
                                    <Calendar size={10} /> Last Modified
                                </p>
                                <p className="text-zinc-200 text-xs font-semibold">{new Date(product.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ProductPage