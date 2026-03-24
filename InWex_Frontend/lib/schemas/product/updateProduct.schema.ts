import z from "zod"

export const updateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    description: z.string().min(1, "Description is required"),
    unit_of_measure: z.string().min(1, "Unit is required"),
    barcode: z.string().min(1, "Barcode is required"),
    cost_price: z.string().min(1, "Cost price is required"),
    selling_price: z.string().min(1, "Selling price is required"),
    image: z.instanceof(File).optional(),
    category: z.string().min(1, "Category is required"),
    is_perishable: z.boolean(),
})

export type UpdateProductValues = z.infer<typeof updateProductSchema> 
