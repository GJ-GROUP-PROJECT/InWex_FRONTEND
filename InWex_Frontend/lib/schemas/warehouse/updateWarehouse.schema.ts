import z from "zod";

export const updateWarehouseSchema = z.object({
    name: z.string().min(1, "Warehouse name is required").max(100, "Name too long"),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
})

export type UpdateWarehouseValues = z.infer<typeof updateWarehouseSchema>