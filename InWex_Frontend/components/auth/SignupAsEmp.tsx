import { Form, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SignupEmpValues, signupSchema } from "@/lib/validation/emp-signup.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const SignupAsEmp = () => {
    const form = useForm<SignupEmpValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            contact: ""
        }
    });

    const onSubmit = (data: SignupEmpValues) => {
        console.log(data)
    }

    return (
        <Card className='w-95 border-none bg-background'>
            <CardHeader>
                <CardTitle className='text-4xl'>Create an account</CardTitle>
                <CardTitle className='font-light'>Enter your details below to create your account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5' noValidate>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='mt-3'>
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
                                <FormItem className='mb-5'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' autoComplete="current-password" placeholder='••••••••' {...field} className='pl-4 border-none' />
                                    </FormControl>
                                    <FormMessage className="transition-opacity duration-200" />
                                </FormItem>
                            )}
                        />

                        < FormField
                            control={form.control}
                            name='contact'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+91 9772122472" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={form.formState.isSubmitting}
                            className='w-45 self-center cursor-pointer'
                        >
                            {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignupAsEmp