import { z } from "zod"

export const signupEmpSchema = z.object({
    fullname: z.string().min(2, "Name is required"),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, "Minimum 8 characters"),
    contact_number: z.string().min(10, "Contact number is required").regex(/^[0-9]+$/, "Contact must contain only numbers"),
    org: z.string(),
    is_warehouse_staff: z.literal(true),
})

export type SignupEmpValues = z.infer<typeof signupEmpSchema>