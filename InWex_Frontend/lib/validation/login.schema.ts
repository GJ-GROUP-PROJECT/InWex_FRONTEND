import { z } from "zod"

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, "Minimum 8 characters"),
})

export type LoginValues = z.infer<typeof loginSchema>