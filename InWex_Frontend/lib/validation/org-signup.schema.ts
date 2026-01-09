import { z } from "zod"

export const signupOrgSchema = z.object({
    org_name: z.string().min(2, "Name is required"),
    org_email: z.email({ message: "Invalid email" }),
    org_password: z.string().min(8, "Minimum 8 characters"),
    org_contact: z.string()
})

export type SignupOrgValues = z.infer<typeof signupOrgSchema>