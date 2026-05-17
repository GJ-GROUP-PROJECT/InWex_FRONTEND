"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupOrgSchema, SignupOrgValues } from "@/lib/schemas/validation/org-signup.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"
import axios from "axios"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { fraunces } from "@/lib/fonts"

const inputClass = "h-8 w-full text-xs pl-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-zinc-500 placeholder:text-[10px] text-white transition-all duration-300 hover:border-violet-500/60 hover:shadow-[-4px_4px_20px_rgba(124,58,237,0.2)] focus:border-violet-500/60 focus:shadow-[-4px_4px_24px_rgba(124,58,237,0.3)]"

const SignupAsComp = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

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
        { name: "fullname", label: "Business Name", placeholder: "Example Full Name", type: "text", autoComplete: "name" },
        { name: "email", label: "Business Email", placeholder: "your@example.com", type: "email", autoComplete: "email" },
        { name: "contact_number", label: "Business Contact", placeholder: "9772122472", type: "text", autoComplete: undefined },
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
        try {
            await api.post<SignupOrgResponse>("/accounts/register", data)
            sessionStorage.setItem("pendingVerification", "true")
            router.push("/auth/verify")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.contact_number?.[0] || error.response?.data?.email?.[0] || "Signup failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-95 border-none bg-background">
                <CardHeader className="text-center space-y-1">
                    <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-1">
                        Business Account
                    </p>
                    <CardTitle className={`${fraunces.className} text-4xl font-bold italic tracking-tight text-white leading-tight`}>
                        Add Your Business.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col space-y-4' noValidate>
                            {OrgFields.map(({ name, label, placeholder, type, autoComplete }) => (
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
                                                    className={inputClass}
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-300">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    className={inputClass}
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[11px]" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type='submit'
                                disabled={form.formState.isSubmitting}
                                className='h-8 text-xs w-36 mb-2 self-center cursor-pointer duration-300'
                            >
                                {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                            </Button>

                            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                                Already have a business account?
                                <Button
                                    type="button"
                                    variant="link"
                                    className="p-0 text-[11px] h-auto cursor-pointer"
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