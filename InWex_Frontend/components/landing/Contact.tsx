import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus("success");
            setFormData({ name: "", email: "", message: "" });

            // Clear success message after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        }, 1000);
    };

    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-24">
            {/* Section Header */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Have questions about our warehouse management system? We&39;d love to
                    hear from you.
                </p>
            </div>

            {/* Contact Form */}
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                            >
                                Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium mb-2"
                            >
                                Message
                            </label>
                            <Textarea
                                id="message"
                                placeholder="Tell us how we can help you..."
                                rows={6}
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                required
                            />
                        </div>

                        {submitStatus === "success" && (
                            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-md">
                                Thank you for your message! We&39;ll get back to you soon.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Contact