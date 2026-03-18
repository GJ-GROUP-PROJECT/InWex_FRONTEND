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
        <div className="mt-8 md:mt-12 w-full px-4 sm:px-6 md:px-10 pb-20 space-y-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/dashboard/inventory")}
                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Inventory
                </Button>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/dashboard/inventory/products/update/${product.id}`)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border-none flex-1 sm:flex-none"
                    >
                        <Edit3 className="mr-2 h-4 w-4" />
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
                        className="rounded-xl border-none px-6 flex-1 sm:flex-none"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                <Card className="lg:col-span-1 bg-zinc-950 border-none rounded-3xl overflow-hidden flex flex-col h-full">
                    <div className="aspect-square bg-zinc-900/30 flex items-center justify-center p-10 shrink-0">
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
                            <Package size={80} className="text-zinc-800" />
                        )}
                    </div>
                    <CardContent className="p-8 space-y-6 grow flex flex-col justify-between">
                        <div className="space-y-4">
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 rounded-lg w-fit">
                                {category.name}
                            </Badge>
                            <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">{product.name}</h1>
                            <p className="text-zinc-500 text-base leading-relaxed">
                                {product.description || "No description available."}
                            </p>
                        </div>

                        <div className="pt-6 space-y-4 border-t border-zinc-900">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500 flex items-center gap-3"><Tag size={16} /> SKU</span>
                                <span className="text-zinc-300 font-mono bg-zinc-900/50 px-2 py-0.5 rounded">{product.sku}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500 flex items-center gap-3"><Barcode size={16} /> Barcode</span>
                                <span className="text-zinc-300 font-mono">{product.barcode || "null"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500 flex items-center gap-3"><Box size={16} /> Unit</span>
                                <span className="text-zinc-300 font-medium">{product.unit_of_measure}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 flex flex-col gap-6 h-full">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                        <Card className="bg-zinc-950 border-none p-8 rounded-3xl flex flex-col justify-center h-44">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">Cost Price</p>
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-4xl font-bold text-white">₹{product.cost_price}</span>
                                <span className="text-zinc-600 text-sm">/ unit</span>
                            </div>
                        </Card>

                        <Card className="bg-zinc-950 border-none p-8 rounded-3xl flex flex-col justify-center h-44">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">Selling Price</p>
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-4xl font-bold text-white">₹{product.selling_price}</span>
                                <span className="text-zinc-600 text-sm">/ unit</span>
                            </div>
                        </Card>
                    </div>

                    <Card className="bg-zinc-950 border-none rounded-3xl overflow-hidden grow flex flex-col">
                        <CardContent className="p-0 flex flex-col h-full divide-y divide-zinc-900/50">
                            <div className="p-8 flex-1 flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-zinc-500 text-sm font-medium">Profit Margin</p>
                                    <p className="text-4xl font-bold text-white flex items-center gap-3">
                                        <TrendingUp className="text-emerald-500" size={28} />
                                        {margin}%
                                    </p>
                                </div>
                                <div className="text-right space-y-2">
                                    <p className="text-zinc-500 text-sm font-medium">Net Profit</p>
                                    <p className="text-4xl font-bold text-emerald-500">₹{profit.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="p-8 flex items-center justify-between bg-zinc-900/10">
                                <div className="space-y-2">
                                    <p className="text-zinc-500 text-sm font-medium">Inventory Status</p>
                                    <p className={`text-3xl font-bold ${product.warehouse_stocks?.quantity < 10 ? "text-orange-500" : "text-white"}`}>
                                        {product.warehouse_stocks?.quantity ?? 1} <span className="text-sm font-normal text-zinc-500 ml-1">Units in hand</span>
                                    </p>
                                </div>
                                <Badge className={`${product.warehouse_stocks?.quantity < 10 ? "bg-orange-500/10 text-orange-500" : "bg-emerald-500/10 text-emerald-500"} border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider`}>
                                    {product.warehouse_stocks?.quantity < 10 ? "Low Stock" : "In Stock"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-950 border-none p-8 rounded-3xl shrink-0">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                                    <Calendar size={12} /> Date Created
                                </p>
                                <p className="text-zinc-200 text-base font-semibold">{new Date(product.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="space-y-2 text-right md:text-left">
                                <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 md:justify-start justify-end">
                                    <Calendar size={12} /> Last Modified
                                </p>
                                <p className="text-zinc-200 text-base font-semibold">{new Date(product.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ProductPage