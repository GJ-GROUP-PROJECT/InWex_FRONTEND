"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupOrgSchema, SignupOrgValues } from "@/lib/validation/org-signup.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"
import axios from "axios"
import { toast } from "sonner"

const SignupAsComp = () => {
    const router = useRouter()

    const form = useForm<SignupOrgValues>({
        resolver: zodResolver(signupOrgSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            contact_number: "",
            is_business: true,
            is_warehouse_staff: false,
        }
    })

    const OrgFields = [
        {
            name: "fullname",
            label: "Business Name",
            placeholder: "Example Full Name",
            type: "text",
            autoComplete: "name",
        },
        {
            name: "email",
            label: "Business Email",
            placeholder: "your@example.com",
            type: "email",
            autoComplete: "email",
        },
        {
            name: "password",
            label: "Password",
            placeholder: "••••••••",
            type: "password",
            autoComplete: "current-password",
        },
        {
            name: "contact_number",
            label: "Business Contact",
            placeholder: "9772122472",
            type: "text",
            autoComplete: undefined,
        },
    ] satisfies readonly {
        name: keyof SignupOrgValues
        label: string
        placeholder: string
        type: string
        autoComplete?: string
    }[]

    type SignupOrgResponse = {
        message: string,
        orgId: string,
        token?: string
    }

    const onSubmit = async (data: SignupOrgValues) => {
        console.log(data)
        try {
            const res = await api.post<SignupOrgResponse>("/accounts/register", data)
            console.log("org signup data:", res.data)
            router.push("/dashboard")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                    "Signup failed:"
                )
            } else {
                toast.error("Unexpected error occurred during signup")
            }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-md border-none bg-background">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-[42px] m-0">Add Your Business</CardTitle>
                    <p className="text-m text-muted-foreground">
                        Enter your business details to create your business account
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col space-y-5' noValidate>
                            {OrgFields.map(({ name, label, placeholder, type, autoComplete }) => (
                                <FormField
                                    key={name}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={type}
                                                    placeholder={placeholder}
                                                    autoComplete={autoComplete}
                                                    className="pl-4 border-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <Button
                                type='submit'
                                disabled={form.formState.isSubmitting}
                                className='w-45 mb-2 self-center cursor-pointer'
                            >
                                {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                            </Button>

                            <p className="flex items-center mb-0 justify-center gap-2 text-sm">
                                Already have an business account created?
                                <Button
                                    type="button"
                                    variant="link"
                                    className="p-0 cursor-pointer"
                                    onClick={() => router.push("/auth")}
                                >
                                    Login
                                </Button>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default SignupAsComp