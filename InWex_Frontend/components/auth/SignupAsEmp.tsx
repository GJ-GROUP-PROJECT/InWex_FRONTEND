"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SignupEmpValues, signupEmpSchema } from "@/lib/schemas/validation/emp-signup.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type SignupFormProps = {
    onSwitch: () => void
}

const SignupAsEmp = ({ onSwitch }: SignupFormProps) => {
    const router = useRouter()
    const [orgs, setOrgs] = useState<Array<{ id: string; name: string }>>([])

    useEffect(() => {
        const fetchingOrg = async () => {
            try {
                const res = await api.get("/accounts/companies")
                setOrgs(res.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Fetching failed:", error.response?.data)
                } else {
                    console.error("Unexpected error:", error)
                }
            }
        }
        fetchingOrg()
    }, [])

    const form = useForm<SignupEmpValues>({
        resolver: zodResolver(signupEmpSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            contact_number: "",
            company: "",
            is_business: false,
            is_warehouse_staff: true,
        }
    })

    const EmpFields = [
        { name: "fullname", label: "Name", placeholder: "Example Full Name", type: "text", autoComplete: "name" },
        { name: "email", label: "Email", placeholder: "your@example.com", type: "email", autoComplete: "email" },
        { name: "password", label: "Password", placeholder: "••••••••", type: "password", autoComplete: "current-password" },
        { name: "contact_number", label: "Contact", placeholder: "9772122472", type: "text", autoComplete: undefined },
    ] satisfies readonly {
        name: keyof SignupEmpValues
        label: string
        placeholder: string
        type: string
        autoComplete?: string
    }[]

    const onSubmit = async (data: SignupEmpValues) => {
        try {
            await api.post("/accounts/register", data)
            router.push("/auth/verify")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Signup failed")
            } else {
                toast.error("Unexpected error occurred during signup")
            }
        }
    }

    return (
        <Card className='w-90 border-none bg-background'>
            <CardHeader>
                <CardTitle className='text-3xl tracking-tight'>Sign Up</CardTitle>
                <p className="text-xs text-muted-foreground">
                    Enter your details to create your account
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4' noValidate>
                        {EmpFields.map(({ name, label, placeholder, type, autoComplete }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-300">{label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={type}
                                                placeholder={placeholder}
                                                autoComplete={autoComplete}
                                                className="h-9 text-xs! pl-3 border-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[11px]" />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-zinc-300">Organization</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={!orgs.length}>
                                            <SelectTrigger className="h-8 text-xs pl-3 border-none w-full">
                                                <SelectValue placeholder="Select Organization" />
                                            </SelectTrigger>
                                            <SelectContent align="start" className="border-none text-xs" position="popper">
                                                {orgs.map((org) => (
                                                    <SelectItem key={org.id} value={org.id.toString()} className="text-xs">
                                                        {org.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={form.formState.isSubmitting}
                            className='h-8 text-xs w-36 self-center cursor-pointer'
                        >
                            {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                        </Button>

                        <p className="flex items-center justify-center gap-1.5 mb-1 text-[11px] text-muted-foreground">
                            Already have an account?
                            <Button type="button" variant="link" className="p-0 text-[11px] h-auto cursor-pointer" onClick={onSwitch}>
                                Login
                            </Button>
                        </p>

                        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                            Don&#39;t see your organization?
                            <Button type="button" variant="link" className="p-0 text-[11px] h-auto cursor-pointer" onClick={() => router.push("/auth/org/signup")}>
                                Create one
                            </Button>
                        </p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignupAsEmp