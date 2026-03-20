import { useEffect, useState } from "react"
import { ShoppingCart, Search, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet, SheetContent, SheetDescription, SheetFooter,
    SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { AddOrdersSchema, OrderValues } from "@/lib/schemas/order/addOrders.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDebouncedCallback } from "use-debounce"
import { Product } from "@/lib/types/types"
import { useOrder } from "@/contexts/OrderContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { api } from "@/lib/api"

const CartDrawer = () => {
    const [step, setStep] = useState<"build" | "review">("build")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [query, setQuery] = useState("")

    const { pendingOrder, stageOrder, productCache, cacheProducts, addOrder } = useOrder()
    const router = useRouter()

    const form = useForm<OrderValues>({
        resolver: zodResolver(AddOrdersSchema),
        mode: "onChange",
        defaultValues: pendingOrder || {
            order_type: "Inbound",
            status: "Requested",
            notes: "",
            client: "",
            items: [],
        }
    })

    const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" })
    const watchOrderType = useWatch({ control: form.control, name: "order_type" })
    const watchItems = useWatch({ control: form.control, name: "items" })
    const watchClient = useWatch({ control: form.control, name: "client" })

    const totalPrice = watchItems?.reduce((acc, item) => {
        return acc + (Number(item.unit_price || 0) * Number(item.quantity || 0))
    }, 0) || 0

    useEffect(() => {
        const subscription = form.watch((value) => { stageOrder(value as OrderValues) })
        return () => subscription.unsubscribe()
    }, [form, stageOrder])

    const handleProceedToCheckout = async () => {
        const isValid = await form.trigger()
        if (!isValid) return toast.error("Please fix the errors in your order")
        const data = form.getValues()
        if (data.items.length === 0) return toast.error("Cart is empty")

        if (data.order_type === "Inbound") {
            await addOrder(data)
            form.reset()
            setStep("build")
            return
        }

        stageOrder(data)
        router.push("/dashboard/orders/checkout")
    }

    const handleSearch = useDebouncedCallback(async (value: string) => {
        setQuery(value)
        if (!value.trim()) return
        setIsSearching(true)
        try {
            const res = await api.get(`products/product-search?product=${value}`)
            setSearchResults(res.data.results)
        } finally {
            setIsSearching(false)
        }
    }, 300)

    const handleAddProduct = (product: Product) => {
        cacheProducts([product])
        const currentItems = form.getValues("items")
        const existingIndex = currentItems.findIndex(i => i.product === product.id)
        if (existingIndex !== -1) {
            form.setValue(`items.${existingIndex}.quantity`, currentItems[existingIndex].quantity + 1)
        } else {
            append({ product: product.id, quantity: 1, unit_price: String(product.cost_price) })
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="relative hover:bg-white/80 rounded-lg transition-all group" size="icon">
                    <ShoppingCart size={14} />
                    {fields.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center">
                            {fields.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="bg-zinc-950 border-none text-white sm:max-w-sm px-0 flex flex-col">
                <Form {...form}>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-1 overflow-hidden">

                        <SheetHeader className="space-y-0.5 px-5 pt-4">
                            <SheetTitle className="text-xl! font-bold text-white">Create New Order</SheetTitle>
                            <SheetDescription className="text-xs text-zinc-500">
                                Search and add products to your order.
                            </SheetDescription>
                        </SheetHeader>

                        {/* Tabs */}
                        <div className="flex gap-6 border-b border-zinc-800 px-5 mt-2">
                            {["build", "review"].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStep(s as "build" | "review")}
                                    className={`py-2 text-xs font-medium border-b-2 transition-colors capitalize ${step === s ? "border-white text-white" : "border-transparent text-zinc-500"}`}
                                >
                                    {s === "build" ? "Build Order" : "Review"}
                                </button>
                            ))}
                        </div>

                        {step === "build" ? (
                            <div className="flex-1 overflow-y-auto flex flex-col">
                                <div className="px-5 pt-4 pb-4 border-b border-zinc-800 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="order_type"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px]! text-zinc-400 font-medium uppercase tracking-wider">Order Type</FormLabel>
                                                <FormControl>
                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-2">
                                                        {["Inbound", "Outbound"].map((type) => (
                                                            <FormItem key={type} className="space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value={type} className="sr-only" type="button" />
                                                                </FormControl>
                                                                <FormLabel className={`px-4 py-2 rounded-lg text-xs! font-bold transition-colors cursor-pointer border ${field.value === type ? "bg-white text-zinc-950 border-white" : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-900"}`}>
                                                                    {type === "Inbound" ? "Stock In" : "Stock Out"}
                                                                </FormLabel>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[10px]! text-zinc-400 font-medium uppercase tracking-wider">Notes (optional)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g. Stock purchased from supplier" className="h-9 text-xs! rounded-lg px-3 border-none" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Client field — Outbound only */}
                                    {watchOrderType === "Outbound" && (
                                        <FormField
                                            control={form.control}
                                            name="client"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1.5">
                                                    <FormLabel className="text-[10px]! text-zinc-400 font-medium uppercase tracking-wider">
                                                        Client <span className="normal-case text-zinc-600">(optional)</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="e.g. Acme Corp" className="h-9 text-xs! rounded-lg px-3 border-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>

                                {/* Search */}
                                <div className="px-5 pt-4 pb-2 shrink-0">
                                    <Label className="text-[10px]! text-zinc-400 font-medium uppercase tracking-wider mb-2 block">Add Products</Label>
                                    <InputGroup className="bg-zinc-900/50 border-none w-full h-8 pl-3 rounded-lg focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
                                        <InputGroupInput
                                            placeholder="Search products..."
                                            className="text-xs! placeholder:text-zinc-600 text-zinc-100 bg-transparent"
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                        <InputGroupAddon>
                                            <Search className="h-3.5 w-3.5 text-zinc-600" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>

                                {/* Results */}
                                <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-1.5 mt-2">
                                    {form.formState.errors.items && (
                                        <p className="text-[10px] text-red-500">{form.formState.errors.items.message}</p>
                                    )}
                                    {isSearching && <p className="text-[10px] text-zinc-500 text-center py-4">Searching...</p>}
                                    {!isSearching && query && searchResults.length === 0 && (
                                        <p className="text-[10px] text-zinc-500 text-center py-4">No products found</p>
                                    )}
                                    {!isSearching && query && searchResults.map((product) => {
                                        const inCart = watchItems?.find(i => String(i.product) === String(product.id))
                                        return (
                                            <button
                                                key={product.id}
                                                type="button"
                                                onClick={() => handleAddProduct(product)}
                                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 transition-colors group"
                                            >
                                                <div className="text-left">
                                                    <p className="text-xs font-medium text-white">{product.name}</p>
                                                    <p className="text-[10px] text-zinc-500 mt-0.5">₹{product.cost_price}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    {inCart && <span className="text-[10px] text-emerald-400 font-medium">x{inCart.quantity}</span>}
                                                    <span className="h-5 w-5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center transition-colors shrink-0">
                                                        <Plus className="h-3 w-3 text-zinc-400" />
                                                    </span>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                                <section>
                                    <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">Order Summary</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                            <p className="text-[10px] text-zinc-500 uppercase">Movement</p>
                                            <p className={`text-xs font-bold ${watchOrderType === "Inbound" ? "text-emerald-400" : "text-amber-400"}`}>
                                                {watchOrderType === "Inbound" ? "Stock In" : "Stock Out"}
                                            </p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                            <p className="text-[10px] text-zinc-500 uppercase">Status</p>
                                            <p className="text-xs font-bold text-white">Requested</p>
                                        </div>
                                    </div>

                                    {/* Client — shown in review only for Outbound with a value */}
                                    {watchOrderType === "Outbound" && watchClient && (
                                        <div className="mt-2 p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                            <p className="text-[10px] text-zinc-500 uppercase">Client</p>
                                            <p className="text-xs font-bold text-white">{watchClient}</p>
                                        </div>
                                    )}

                                    {form.getValues("notes") && (
                                        <div className="mt-2 p-2.5 rounded-lg bg-zinc-900/30 border border-dashed border-zinc-800">
                                            <p className="text-[10px] text-zinc-500 uppercase">Notes</p>
                                            <p className="text-xs text-zinc-300 italic line-clamp-2">&#34;{form.getValues("notes")}&#34;</p>
                                        </div>
                                    )}
                                </section>

                                <section className="flex-1">
                                    <div className="flex justify-between items-end mb-2 px-0.5">
                                        <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Items Breakdown</h3>
                                        <span className="text-[10px] text-zinc-500 font-mono">{fields.length} SKUs</span>
                                    </div>
                                    <div>
                                        {fields.map((field, index) => {
                                            const productId = watchItems[index]?.product
                                            const productDetail = searchResults.find(p => String(p.id) === String(productId)) ?? productCache[String(productId)]
                                            return (
                                                <div key={field.id} className="group p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1.5">
                                                            <p className="text-xs font-semibold text-white leading-tight">
                                                                {productDetail?.name || "Unknown product"}
                                                            </p>
                                                            <p className="text-[10px] text-zinc-500">
                                                                {watchItems[index]?.quantity} units x ₹{Number(watchItems[index]?.unit_price).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-1">
                                                            <p className="text-xs font-bold text-white">
                                                                ₹{(Number(watchItems[index]?.unit_price || 0) * Number(watchItems[index]?.quantity || 0)).toLocaleString()}
                                                            </p>
                                                            <button type="button" onClick={() => remove(index)} className="p-1 hover:bg-red-500/10 rounded transition-colors group/trash">
                                                                <Trash2 className="h-3 w-3 text-zinc-600 group-hover/trash:text-red-500" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                            </div>
                        )}

                        <SheetFooter className="px-5 py-4 border-t border-zinc-800 bg-zinc-950 mt-auto shrink-0">
                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center px-0.5">
                                    <span className="text-zinc-400 text-xs">Total Amount</span>
                                    <span className="text-white font-bold text-sm">₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <Button
                                    type="button"
                                    onClick={step === "build" ? () => setStep("review") : handleProceedToCheckout}
                                    disabled={fields.length === 0}
                                    className="w-full h-8 text-xs rounded-lg bg-zinc-100 text-zinc-950 font-bold hover:bg-white"
                                >
                                    {step === "build"
                                        ? `Review Order (${fields.length})`
                                        : watchOrderType === "Inbound"
                                            ? "Add Stock"
                                            : "Proceed to Checkout"
                                    }
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default CartDrawer