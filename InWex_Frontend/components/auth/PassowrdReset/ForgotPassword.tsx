"use client"

import { ForgotPasswordFormType, forgotPasswordSchema } from "@/lib/schemas/validation/passwordReset/forgot-password.schema"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"
import { fraunces } from "@/lib/fonts"

const inputClass = "h-8 w-full text-xs pl-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-zinc-500 placeholder:text-[10px] text-white transition-all duration-300 hover:border-violet-500/60 hover:shadow-[-4px_4px_20px_rgba(124,58,237,0.2)] focus:border-violet-500/60 focus:shadow-[-4px_4px_24px_rgba(124,58,237,0.3)]"

const ForgotPassword = () => {
    const router = useRouter()

    const form = useForm<ForgotPasswordFormType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            "email": ""
        }
    })

    const onSubmit = async (data: ForgotPasswordFormType) => {
        console.log(data)
        router.push("/auth/otp")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-96 border-none bg-transparent">
                <CardHeader className="text-center space-y-1">
                    <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-1">
                        Password Reset
                    </p>
                    <CardTitle className={`${fraunces.className} text-4xl font-bold italic tracking-tight text-white leading-tight`}>
                        Forgot Password.
                    </CardTitle>
                    <p className="text-xs text-muted-foreground pt-1">
                        No worries — enter your email and we&#39;ll send you a reset link.
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-300">Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" autoComplete="email" placeholder="your@gmail.com" {...field} className={inputClass} />
                                        </FormControl>
                                        <FormMessage className="text-[11px] transition-opacity duration-200" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="h-8 text-xs w-36 mt-2 self-center cursor-pointer transition-all duration-300"
                            >
                                {form.formState.isSubmitting ? "Sending..." : "Send OTP"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword