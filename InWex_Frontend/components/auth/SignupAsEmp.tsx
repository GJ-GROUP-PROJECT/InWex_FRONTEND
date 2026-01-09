"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SignupEmpValues, signupSchema } from "@/lib/validation/emp-signup.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type SignupFormProps = {
    onSwitch: () => void
}

const SignupAsEmp = ({ onSwitch }: SignupFormProps) => {
    const form = useForm<SignupEmpValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            contact: ""
        }
    });

    const EmpFields = [
        {
            name: "name",
            label: "Name",
            placeholder: "Example",
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
            name: "contact",
            label: "Contact",
            placeholder: "+91 9772122472",
            type: "text",
            autoComplete: undefined,
        },
    ] as const


    const onSubmit = (data: SignupEmpValues) => {
        console.log(data)
    }

    return (
        <Card className='w-95 border-none bg-background'>
            <CardHeader>
                <CardTitle className='text-4xl'>SignUp</CardTitle>
                <CardTitle className='font-light'>Enter your details to create your account</CardTitle>
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
                                                <SelectItem value="1">InWex</SelectItem>
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
                            {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <p className="flex items-center justify-center gap-2 text-sm">
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
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignupAsEmp