import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, "Minimum 8 characters")
    // contact:
    // org:
})

export type SignupValues = z.infer<typeof signupSchema>