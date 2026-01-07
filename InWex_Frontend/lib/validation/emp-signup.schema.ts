import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, "Minimum 8 characters"),
    contact: z.string().min(10, "Contact number is required").regex(/^[0-9]+$/, "Contact must contain only numbers")
    // org:
})

export type SignupEmpValues = z.infer<typeof signupSchema>