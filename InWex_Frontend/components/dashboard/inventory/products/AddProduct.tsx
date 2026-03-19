"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { productSchema, ProductValues } from "@/lib/schemas/product/addProduct.schema";
import { useProduct } from "@/contexts/ProductContext";
import { useEffect, useRef } from "react";

const AddProduct = () => {
    const { addProduct, categories } = useProduct()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<ProductValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            sku: "",
            category: "",
            unit_of_measure: "",
            barcode: "",
            cost_price: "",
            selling_price: "",
            image: undefined,
            description: "",
        },
    })

    const textFields: {
        name: keyof ProductValues;
        type: string;
        placeholder: string;
    }[] = [
            { name: "name", type: "text", placeholder: "PRODUCT NAME *" },
            { name: "sku", type: "text", placeholder: "SKU *" },
            { name: "unit_of_measure", type: "text", placeholder: "UNIT OF MEASURE *" },
            { name: "barcode", type: "text", placeholder: "BARCODE *" },
            { name: "cost_price", type: "number", placeholder: "COST PRICE (INR) *" },
            { name: "selling_price", type: "number", placeholder: "SELLING PRICE (INR) *" },
        ]

    const isSubmitting = form.formState.isSubmitSuccessful;

    useEffect(() => {
        if (isSubmitting && fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [isSubmitting])

    const onSubmit = async (data: ProductValues) => {
        await addProduct(data)
        form.reset()
    }

    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-16">
            <div className="mb-10 text-center">
                <h2 className="text-xl md:text-3xl font-bold tracking-tight">Add New Product</h2>
                <p className="mt-2 text-xs text-zinc-400 max-w-lg mx-auto">
                    Fill in the details below to register a new product in the warehouse management system.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-full max-w-sm mx-auto"
                >
                    {textFields.map(({ name, type, placeholder }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={type}
                                            placeholder={placeholder}
                                            autoComplete="off"
                                            className="w-full py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus-visible:ring-0 text-[10px]! text-white"
                                            {...field}
                                            value={field.value as string | number | undefined}
                                            onChange={(e) => field.onChange(e)}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                    ))}

                    {/* Category Select */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus:ring-0 text-[10px] text-zinc-500 h-auto">
                                            <SelectValue placeholder="CATEGORY *" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent position="popper" className="w-full bg-zinc-900 border-zinc-800 text-xs">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)} className="text-[10px]">
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />

                    {/* Image File Upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange } }) => (
                            <FormItem>
                                <FormControl>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="w-full py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent rounded-none text-[10px] text-zinc-500 file:bg-transparent file:border-0 file:text-white file:text-[10px] file:cursor-pointer cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) onChange(file)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        placeholder="PRODUCT DESCRIPTION *"
                                        className="w-full min-h-24 py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none resize-none focus:outline-none text-[10px]! text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-center mt-2">
                        <Button
                            variant="ghost"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="px-6 h-8 text-[10px] font-semibold border-0 border-l-2 border-r-2 border-white/30 rounded-none hover:bg-transparent! tracking-widest transition-colors cursor-pointer text-zinc-400 hover:text-white"
                        >
                            {form.formState.isSubmitting ? "ADDING..." : "ADD PRODUCT"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddProduct;