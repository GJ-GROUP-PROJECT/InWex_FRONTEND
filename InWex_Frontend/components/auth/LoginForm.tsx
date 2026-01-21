"use client"

import { loginSchema, LoginValues } from '@/lib/validation/login.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import axios from 'axios'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type LoginFormProps = {
    onSwitch: () => void
}

const LoginForm = ({ onSwitch }: LoginFormProps) => {
    const router = useRouter()

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur"
    })

    const onSubmit = async (data: LoginValues) => {
        console.log(data)
        try {
            const res = await api.post("/accounts/login", data)
            console.log("Login details: ", res.data)
            toast.success("Login successful!")
            router.push("/dashboard")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                    "Invalid email or password"
                )
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <Card className='w-95 border-none bg-background'>
            <CardHeader>
                <CardTitle className='text-4xl'>Login</CardTitle>
                <p className="text-m text-muted-foreground">
                    Enter your credentials
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5' noValidate>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' autoComplete="email" placeholder='your@example.com' {...field} className='pl-4 border-none' />
                                    </FormControl>
                                    <FormMessage className="transition-opacity duration-200" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' autoComplete="current-password" placeholder='••••••••' {...field} className='pl-4 border-none' />
                                    </FormControl>
                                    <FormMessage className="transition-opacity duration-200" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={form.formState.isSubmitting}
                            className='w-45 mb-2 self-center cursor-pointer'
                        >
                            {form.formState.isSubmitting ? 'Logging in...' : 'Log In'}
                        </Button>

                        <p className='flex items-center justify-center gap-2 text-sm'>
                            Don&#39;t have an account?
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 text-sm cursor-pointer"
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