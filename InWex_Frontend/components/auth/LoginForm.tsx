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

type LoginFormProps = {
    onSwitch: () => void
}

const LoginForm = ({ onSwitch }: LoginFormProps) => {
    const { login } = useAuth()

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur"
    })

    const onSubmit = async (data: LoginValues) => {
        login(data)
    }

    return (
        <Card className='w-90 border-none bg-background'>
            <CardHeader>
                <CardTitle className='text-3xl tracking-tight'>Login</CardTitle>
                <p className="text-xs text-muted-foreground">
                    Enter your credentials
                </p>
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
                                        <Input type='email' autoComplete="email" placeholder='your@example.com' {...field} className='h-8 text-xs! pl-3 border-none' />
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
                                        <Input type='password' autoComplete="current-password" placeholder='••••••••' {...field} className='h-8 text-xs! pl-3 border-none' />
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