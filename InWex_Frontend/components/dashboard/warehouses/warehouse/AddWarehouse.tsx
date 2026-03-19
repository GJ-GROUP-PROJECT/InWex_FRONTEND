"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { warehouseSchema, WarehouseValues } from "@/lib/schemas/warehouse/addWarehouse.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const AddWarehouse = () => {
    const { addWarehouse } = useWarehouse()

    const form = useForm<WarehouseValues>({
        resolver: zodResolver(warehouseSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (data: WarehouseValues) => {
        await addWarehouse(data)
        form.reset()
    }

    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-16">
            <div className="mb-10 text-center">
                <h2 className="text-xl md:text-3xl font-bold tracking-tight">Add New Warehouse</h2>
                <p className="mt-2 text-xs text-zinc-400 max-w-lg mx-auto">
                    Fill in the details below to register a new warehouse in the management system.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-full max-w-sm mx-auto"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="WAREHOUSE NAME *"
                                        autoComplete="off"
                                        className="w-full py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus-visible:ring-0 text-[10px]! text-white"
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
                            {form.formState.isSubmitting ? "ADDING..." : "ADD WAREHOUSE"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddWarehouse