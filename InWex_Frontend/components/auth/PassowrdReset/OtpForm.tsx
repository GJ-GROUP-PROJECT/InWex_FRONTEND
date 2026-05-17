"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { otpSchema, OtpType } from "@/lib/schemas/validation/passwordReset/otp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { fraunces } from "@/lib/fonts";

const OtpForm = () => {
    const router = useRouter()

    const form = useForm<OtpType>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" }
    });

    const onSubmit = (data: OtpType) => {
        console.log(data)
        router.push("/auth/reset-password")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-100 border-none bg-transparent">
                <CardHeader className="text-center space-y-1">
                    <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-1">
                        Verification
                    </p>
                    <CardTitle className={`${fraunces.className} text-4xl font-bold italic tracking-tight text-white leading-tight`}>
                        Check Your Email.
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground max-w-xs mx-auto">
                        Enter the verification code we sent to your email address
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-center">
                                        <div className="flex items-center justify-between w-full">
                                            <FormLabel className="text-xs text-zinc-300">Verification Code</FormLabel>
                                            <Button variant="ghost" type="button" className="h-6 px-2 text-[10px] gap-1 text-zinc-400 hover:text-violet-400 transition-colors">
                                                <RefreshCwIcon className="w-2.5 h-2.5" />
                                                Resend
                                            </Button>
                                        </div>
                                        <FormControl>
                                            <InputOTP maxLength={6} id="otp-verification" required {...field}>
                                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-9 *:data-[slot=input-otp-slot]:w-9 *:data-[slot=input-otp-slot]:text-sm *:data-[slot=input-otp-slot]:border-white/20 *:data-[slot=input-otp-slot]:bg-transparent *:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:duration-300 *:data-[slot=input-otp-slot]:hover:border-violet-500/60 *:data-[slot=input-otp-slot]:data-[active=true]:border-violet-500/60 *:data-[slot=input-otp-slot]:data-[active=true]:shadow-[0_0_16px_rgba(124,58,237,0.3)]">
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator className="mx-1 text-zinc-700" />
                                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-9 *:data-[slot=input-otp-slot]:w-9 *:data-[slot=input-otp-slot]:text-sm *:data-[slot=input-otp-slot]:border-white/20 *:data-[slot=input-otp-slot]:bg-transparent *:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:duration-300 *:data-[slot=input-otp-slot]:hover:border-violet-500/60 *:data-[slot=input-otp-slot]:data-[active=true]:border-violet-500/60 *:data-[slot=input-otp-slot]:data-[active=true]:shadow-[0_0_16px_rgba(124,58,237,0.3)]">
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage className="text-[11px] transition-opacity duration-200" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting} className="h-8 text-xs w-30 mt-1 cursor-pointer hover:bg-[#7c3aed] transition-all duration-300">
                                {form.formState.isSubmitting ? "Verifying..." : "Verify"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default OtpForm;