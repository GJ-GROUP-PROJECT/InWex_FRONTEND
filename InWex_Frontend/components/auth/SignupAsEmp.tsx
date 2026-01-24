"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SignupEmpValues, signupEmpSchema } from "@/lib/validation/emp-signup.schema"
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

    const [orgs, setOrgs] = useState<Array<({ id: string; name: string; })>>([])

    useEffect(() => {
        const fetchingOrg = async () => {
            try {
                const res = await api.get("/accounts/companies")

                setOrgs(res.data)
                console.log("Organizations fetched: ", res.data)
            }
            catch (error) {
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
            org: "NO_ORG",
            is_warehouse_staff: true,
        }
    });

    const EmpFields = [
        {
            name: "fullname",
            label: "Full Name",
            placeholder: "Example Full Name",
            type: "text",
            autoComplete: "name",
        },
        {
            name: "email",
            label: "Email",
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
            label: "Contact",
            placeholder: "+91 9772122472",
            type: "text",
            autoComplete: undefined,
        },
    ] as const

    type SignupEmpResponse = {
        message: string,
        token?: string
    }

    const onSubmit = async (data: SignupEmpValues) => {
        console.log(data)
        try {
            const res = await api.post<SignupEmpResponse>("/accounts/register", data)
            console.log("emp signup data:", res.data)
            router.push("/auth/verify")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                    "Signup failed"
                )
            } else {
                toast.error("Unexpected error occurred during signup")
            }
        }
    }

    return (
        <Card className='w-95 border-none bg-background'>
            <CardHeader>
                <CardTitle className='text-4xl'>SignUp</CardTitle>
                <p className="text-m text-muted-foreground">
                    Enter your details to create your account
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5' noValidate>
                        {EmpFields.map(({ name, label, placeholder, type, autoComplete }) => (
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

                        <FormField
                            control={form.control}
                            name="org"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Organization</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="pl-4 border-none w-full">
                                                <SelectValue placeholder="Select Organization" />
                                            </SelectTrigger>

                                            <SelectContent align="start" sideOffset={4} className="border-none">
                                                <SelectItem value="NO_ORG">No Organization</SelectItem>
                                                {orgs.map((org) => (
                                                    <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={form.formState.isSubmitting}
                            className='w-45 mb-2 self-center cursor-pointer'
                        >
                            {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                        </Button>

                        <p className="flex items-center mb-0 justify-center gap-2 text-sm">
                            Already have an account?
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 cursor-pointer"
                                onClick={onSwitch}
                            >
                                Login
                            </Button>
                        </p>

                        <p className="flex items-center justify-center gap-2 text-sm">
                            Don&#39;t see your organization?
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 cursor-pointer"
                                onClick={() => router.push("/auth/org/signup")}
                            >
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