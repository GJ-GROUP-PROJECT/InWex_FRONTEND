import React, { useState } from "react";
import {
    ShoppingCart,
    Search,
    ChevronRight,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { AddOrdersSchema, OrderValues } from "@/lib/schemas/order/addOrders.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useOrder } from "@/contexts/OrderContext";

// Replace with your actual products fetch
const MOCK_PRODUCTS = [
    { id: 1, name: "Sample Product A", sku: "SKU-12345", unit_of_measure: "Units", selling_price: "499.00" },
    { id: 2, name: "Sample Product B", sku: "SKU-67890", unit_of_measure: "Units", selling_price: "299.00" },
];

const CartDrawer = () => {
    const [step, setStep] = useState<"build" | "review">("build");
    const [search, setSearch] = useState("");
    const {addOrder} = useOrder();

    const form = useForm<OrderValues>({
        resolver: zodResolver(AddOrdersSchema),
        defaultValues: {
            order_type: "Inbound",
            status: "Requested",
            notes: "",
            items: [],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const watchOrderType = useWatch({ control: form.control, name: "order_type" });
    const watchItems = useWatch({ control: form.control, name: "items" });

    const totalPrice = watchItems.reduce((acc, item) => {
        return acc + item.unit_price * item.quantity;
    }, 0);

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    const addProduct = (product: typeof MOCK_PRODUCTS[0]) => {
        const existing = fields.findIndex(f => f.product === product.id);
        if (existing !== -1) {
            const current = form.getValues(`items.${existing}.quantity`);
            form.setValue(`items.${existing}.quantity`, current + 1);
        } else {
            append({
                product: product.id,
                quantity: 1,
                unit_price: Number(product.selling_price),
            });
        }
    };

    const onSubmit = async(data: OrderValues) => {
        await addOrder(data);
        form.reset();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="relative p-3 hover:bg-white/80 rounded-xl transition-all group h-auto">
                    <ShoppingCart size={16} />
                    {fields.length > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {fields.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="bg-zinc-950 border-none text-white sm:max-w-md px-0 flex flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">

                        <SheetHeader className="space-y-1 px-6 pt-4">
                            <SheetTitle className="text-2xl font-bold text-white">Create New Order</SheetTitle>
                            <SheetDescription className="text-zinc-500">
                                Search and add products to your order.
                            </SheetDescription>
                        </SheetHeader>

                        {/* Navigation Tabs */}
                        <div className="flex gap-8 border-b border-zinc-800 px-6 mt-2">
                            <button
                                type="button"
                                onClick={() => setStep("build")}
                                className={`py-2.5 text-sm font-medium border-b-2 transition-colors ${step === "build" ? "border-white text-white" : "border-transparent text-zinc-500"}`}
                            >
                                Build Order
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep("review")}
                                className={`py-2.5 text-sm font-medium border-b-2 transition-colors ${step === "review" ? "border-white text-white" : "border-transparent text-zinc-500"}`}
                            >
                                Review
                            </button>
                        </div>

                        {step === "build" ? (
                            <div className="flex-1 overflow-y-auto flex flex-col">
                                <div className="px-6 pt-4 py-6 border-b border-zinc-800 space-y-4">

                                    {/* Order Type */}
                                    <FormField
                                        control={form.control}
                                        name="order_type"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Order Type</Label>
                                                <FormControl>
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => field.onChange("Inbound")}
                                                            className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-colors ${watchOrderType === "Inbound" ? "bg-white text-zinc-950" : "bg-zinc-900/50 text-zinc-400 border border-zinc-800"}`}
                                                        >
                                                            Stock In
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => field.onChange("Outbound")}
                                                            className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-colors ${watchOrderType === "Outbound" ? "bg-white text-zinc-950" : "bg-zinc-900/50 text-zinc-400 border border-zinc-800"}`}
                                                        >
                                                            Stock Out
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Notes */}
                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Notes (optional)</Label>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g. Stock purchased from supplier"
                                                        className="bg-zinc-900/50 border-zinc-800 text-white rounded-xl"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Search */}
                                <div className="px-6 pt-6 pb-2">
                                    <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-2 block">Add Products</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            placeholder="Search by name or SKU"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className="pl-9 bg-zinc-900/50 border-zinc-800 text-white rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-2 mt-4">
                                    {form.formState.errors.items && (
                                        <p className="text-xs text-red-500">{form.formState.errors.items.message}</p>
                                    )}

                                    {filteredProducts.map(product => {
                                        const addedIndex = fields.findIndex(f => f.product === product.id);
                                        const isAdded = addedIndex !== -1;
                                        const addedQty = isAdded ? watchItems[addedIndex]?.quantity : 0;

                                        return (
                                            <div key={product.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                                                    <p className="text-xs text-zinc-500 mt-0.5">{product.sku} · {product.unit_of_measure}</p>
                                                </div>
                                                <div className="flex items-center gap-3 ml-4">
                                                    <span className="text-sm font-bold text-zinc-300">₹{product.selling_price}</span>
                                                    {isAdded ? (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => addedQty === 1 ? remove(addedIndex) : form.setValue(`items.${addedIndex}.quantity`, addedQty - 1)}
                                                                className="h-7 w-7 rounded-xl bg-zinc-800 text-white text-sm font-bold flex items-center justify-center"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="text-sm font-bold text-white w-4 text-center">{addedQty}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => addProduct(product)}
                                                                className="h-7 w-7 rounded-xl bg-zinc-800 text-white text-sm font-bold flex items-center justify-center"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => addProduct(product)}
                                                            className="h-7 px-3 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-bold"
                                                        >
                                                            Add
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Cart Summary Bar */}
                                {fields.length > 0 && (
                                    <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950">
                                        <button
                                            type="button"
                                            onClick={() => setStep("review")}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-sm transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <ShoppingCart className="h-4 w-4" />
                                                Review · {fields.length} items
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                ₹{totalPrice.toFixed(2)}
                                                <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
                                {/* Order Summary */}
                                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase">Type</p>
                                        <p className="font-bold">{watchOrderType === "Inbound" ? "Stock In" : "Stock Out"}</p>
                                    </div>
                                    <button type="button" onClick={() => setStep("build")}>
                                        <Trash2 className="h-4 w-4 text-zinc-600" />
                                    </button>
                                </div>

                                {/* Items Review */}
                                {fields.map((field, index) => {
                                    const product = MOCK_PRODUCTS.find(p => p.id === field.product);
                                    return (
                                        <div key={field.id} className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-semibold text-white">{product?.name}</p>
                                                <p className="text-xs text-zinc-500 mt-0.5">Qty: {watchItems[index]?.quantity} · ₹{field.unit_price} each</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-zinc-300">
                                                    ₹{field.unit_price * (watchItems[index]?.quantity ?? 1))}
                                                </span>
                                                <button type="button" onClick={() => remove(index)}>
                                                    <Trash2 className="h-4 w-4 text-zinc-600 hover:text-red-400 transition-colors" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Total */}
                                <div className="flex justify-between px-1 pt-2">
                                    <span className="text-zinc-400 text-sm">Total</span>
                                    <span className="text-white font-bold">₹{totalPrice.toFixed(2)}</span>
                                </div>

                                <SheetFooter className="mt-auto pt-4 border-t border-zinc-800">
                                    <Button type="submit" className="w-full h-12 rounded-xl bg-zinc-100 text-zinc-950 font-bold">
                                        Place Order
                                    </Button>
                                </SheetFooter>
                            </div>
                        )}
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
