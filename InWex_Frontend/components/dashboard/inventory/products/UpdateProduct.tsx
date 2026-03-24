"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useProduct } from "@/contexts/ProductContext";
import { useEffect, useRef } from "react";
import { updateProductSchema, UpdateProductValues } from "@/lib/schemas/product/updateProduct.schema";
import { Product } from "@/lib/types/types";

const UpdateProduct = ({ product }: { product: Product }) => {
    const { updateProduct, categories } = useProduct()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const category = categories.find(c => c.id === Number(product?.category))

    const form = useForm<UpdateProductValues>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: "",
            sku: "",
            category: "",
            unit_of_measure: "",
            barcode: undefined,
            cost_price: undefined,
            selling_price: undefined,
            description: "",
            image: undefined,
            is_perishable: false,
        },
    })

    useEffect(() => {
        if (product && categories.length > 0) {
            form.reset({
                name: product.name,
                sku: product.sku,
                category: String(category?.id),
                unit_of_measure: product.unit_of_measure,
                barcode: String(product.barcode),
                cost_price: String(product.cost_price),
                selling_price: String(product.selling_price),
                description: product.description,
                image: undefined,
                is_perishable: product.is_perishable,
            });
        }
    }, [product, categories, category, form]);

    const textFields: {
        name: keyof UpdateProductValues;
        type: string;
        placeholder: string;
    }[] = [
            { name: "name", type: "text", placeholder: "PRODUCT NAME *" },
            { name: "sku", type: "text", placeholder: "SKU *" },
            { name: "unit_of_measure", type: "text", placeholder: "UNIT OF MEASURE *" },
            { name: "barcode", type: "text", placeholder: "BARCODE *" },
            { name: "cost_price", type: "number", placeholder: "COST PRICE (INR) *" },
            { name: "selling_price", type: "number", placeholder: "SELLING PRICE (INR) *" },
        ];

    const { isSubmitSuccessful } = form.formState

    useEffect(() => {
        if (isSubmitSuccessful && fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [isSubmitSuccessful]);

    const onSubmit = async (data: UpdateProductValues) => {
        if (!product) return;
        await updateProduct(product.id, { ...data, status: product.status });
    }

    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-16">
            <div className="mb-10 text-center">
                <h2 className="text-xl md:text-3xl font-bold tracking-tight">Update Product</h2>
                <p className="mt-2 text-xs text-zinc-400 max-w-lg mx-auto">
                    Edit the details below to update the product in the warehouse management system.
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
                                            value={
                                                typeof field.value === "number"
                                                    ? field.value
                                                    : typeof field.value === "string"
                                                        ? field.value
                                                        : ""
                                            }
                                            onChange={(e) => field.onChange(e.target.value)}
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
                                <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="w-full py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus:ring-0 text-[10px] text-zinc-500 h-auto">
                                            <SelectValue placeholder="CATEGORY *" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent position="popper" className="w-full bg-zinc-900 border-zinc-800">
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

                    {/* Is Perishable */}
                    <FormField
                        control={form.control}
                        name="is_perishable"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <label className="flex items-center gap-3 cursor-pointer group/check">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                            <div className="h-4 w-4 border-l-2 border-b-2 border-white/30 bg-transparent peer-checked:border-amber-500 transition-colors flex items-center justify-center">
                                                {field.value && (
                                                    <div className="h-2 w-2 bg-amber-500" />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-[10px] tracking-widest text-zinc-500 group-hover/check:text-zinc-300 transition-colors">
                                            PERISHABLE PRODUCT
                                        </span>
                                    </label>
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
                            {form.formState.isSubmitting ? "UPDATING..." : "UPDATE PRODUCT"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UpdateProduct