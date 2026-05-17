import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { AppProviders } from "@/providers/app-providers";
import ScrollOnRefresh from "@/components/scroll/ScrollOnRefresh";
import ScrollTracker from "@/components/scroll/ScrollTracker";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "Inwex",
    description: "Intelligent Network Inventory Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.className}`} >
                <ThemeProvider>
                    <AppProviders>
                        <ScrollOnRefresh />
                        <ScrollTracker />
                        {children}
                        <Toaster richColors position="top-right" />
                    </AppProviders>
                </ThemeProvider>
            </body>
        </html>
    );
}
