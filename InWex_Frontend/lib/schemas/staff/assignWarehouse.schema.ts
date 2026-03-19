import { z } from "zod"

export const AssignWarehouseSchema = z.object({
    warehouse: z.number("Warehouse is required"),
    staff: z.number(),
    can_manage_inventory: z.boolean(),
    can_create_orders: z.boolean(),
})

export type AssignWarehouseValues = z.infer<typeof AssignWarehouseSchema>