"use client"

import { loginSchema, LoginValues } from '@/lib/schemas/validation/login.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import axios from 'axios'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { fraunces } from '@/lib/fonts'

type LoginFormProps = {
    onSwitch: () => void
}

const inputClass = "h-8 w-full text-xs pl-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-zinc-500 placeholder:text-[10px] text-white transition-all duration-300 hover:border-violet-500/60 hover:shadow-[-4px_4px_20px_rgba(124,58,237,0.2)] focus:border-violet-500/60 focus:shadow-[-4px_4px_24px_rgba(124,58,237,0.3)]"

const LoginForm = ({ onSwitch }: LoginFormProps) => {
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur"
    })

    const onSubmit = async (data: LoginValues) => {
        try {
            await login(data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.non_field_errors?.[0] || "Login failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <Card className='w-90 border-none bg-background'>
            <CardHeader>
                <p className="text-xs text-violet-400 uppercase tracking-widest font-medium mb-1">
                    Account Access
                </p>
                <CardTitle className={`${fraunces.className} text-4xl font-bold italic tracking-tight text-white leading-tight`}>
                    Log In.
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4' noValidate>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-zinc-300">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            autoComplete="email"
                                            placeholder='your@example.com'
                                            {...field}
                                            className={inputClass}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-zinc-300">Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                placeholder='••••••••'
                                                {...field}
                                                className={inputClass}
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
                                    <div className='flex justify-end mt-1'>
                                        <Link href="/auth/forgot-password" className='text-[11px] text-muted-foreground hover:text-primary transition-colors'>
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={form.formState.isSubmitting}
                            className='h-8 text-xs w-36 mb-2 self-center cursor-pointer'
                        >
                            {form.formState.isSubmitting ? 'Logging in...' : 'Log In'}
                        </Button>

                        <p className='flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground'>
                            Don&#39;t have an account?
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 text-[11px] h-auto cursor-pointer"
                                onClick={onSwitch}
                            >
                                Sign up
                            </Button>
                        </p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginForm