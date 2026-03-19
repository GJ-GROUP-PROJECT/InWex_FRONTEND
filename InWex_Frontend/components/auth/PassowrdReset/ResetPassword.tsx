"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordSchema, ResetPasswordType } from "@/lib/schemas/validation/passwordReset/reset-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const ResetPassword = () => {
    const router = useRouter()

    const form = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data: ResetPasswordType) => {
        console.log(data)
        router.push("/auth")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-90 border-none bg-transparent">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-3xl tracking-tight">Set New Password</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Please enter your new password below.
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-300">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" autoComplete="new-password" placeholder="••••••••" {...field} className="h-8 text-xs! pl-3 border-none" />
                                        </FormControl>
                                        <FormMessage className="text-[11px] transition-opacity duration-200" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-300">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" autoComplete="password" placeholder="••••••••" {...field} className="h-8 text-xs pl-3 border-none" />
                                        </FormControl>
                                        <FormMessage className="text-[11px] transition-opacity duration-200" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="h-8 text-xs w-36 mt-2 self-center cursor-pointer"
                            >
                                {form.formState.isSubmitting ? "Changing..." : "Change"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPassword