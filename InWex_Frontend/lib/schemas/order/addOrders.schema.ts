import z from "zod";

export const AddOrdersSchema = z.object({
    order_type: z.enum(["Inbound", "Outbound"]),
    status: z.enum(["Requested", "In_Progress", "Delivered", "Returned", "Cancelled"]),
    notes: z.string().optional(),
    client: z.string().optional(),
    address: z.string().optional(),
    items: z.array(z.object({
        product: z.number(),
        quantity: z.number().min(1),
        unit_price: z.string(),
        expiry_date: z.string().optional(),
    })).min(1, "Add at least one item"),
})

export type OrderValues = z.infer<typeof AddOrdersSchema>