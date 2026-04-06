import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { contactSchema, ContactValues } from "@/lib/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Contact = () => {
    const form = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            "name": "",
            "email": "",
            "message": ""
        },
    })

    const formElements: {
        name: keyof ContactValues,
        type: string,
        placeholder: string,
        autocomplete: string
    }[] = [
            {
                name: "name",
                type: "text",
                placeholder: "ENTER YOUR NAME *",
                autocomplete: "name",
            },
            {
                name: "email",
                type: "email",
                placeholder: "ENTER YOUR EMAIL *",
                autocomplete: "email",
            },
        ]

    const onSubmit = async (data: ContactValues) => {
        try {
            await api.post("/accounts/support", data)
            toast.success("Request Sent")
            form.reset()
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data?.message)
                toast.error(
                    error.response?.data?.message ||
                    "Invalid Request"
                )
            }
            else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className="mx-auto max-w-4xl px-6 gap-20 w-full py-24">
            {/* Section Header */}
            <div className="mb-12 text-center">
                <h2 className="text-xl md:text-4xl font-bold tracking-tight">Get In Touch</h2>
                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed max-w-lg mx-auto">
                    Have questions about our inventory management system? We&#39;d love to
                    hear from you.
                </p>
            </div>

            {/* Contact Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                    {formElements.map(({ name, type, placeholder, autocomplete }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={type}
                                            placeholder={placeholder}
                                            autoComplete={autocomplete}
                                            className="w-full py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-zinc-500 placeholder:text-[10px] text-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                    ))}
                    <FormField
                        control={form.control}
                        name="message"
                        render={(({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        placeholder="YOUR MESSAGE *"
                                        className="w-full min-h-24 py-2 px-3 border-0 border-l-2 border-b-2 border-white/30 bg-transparent! rounded-none resize-none focus:outline-none placeholder:text-zinc-500 placeholder:text-[10px] text-xs text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        ))}
                    />
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            variant="ghost"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="px-6 h-8 text-[10px] font-semibold border-0 border-l-2 border-r-2 border-white/30 rounded-none hover:bg-transparent! tracking-widest transition-colors cursor-pointer text-zinc-400 hover:text-white"
                        >
                            {form.formState.isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Contact