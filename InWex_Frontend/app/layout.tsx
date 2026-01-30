import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { AppProviders } from "@/providers/app-providers";
import ScrollOnRefresh from "@/components/scroll/ScrollOnRefresh";
import ScrollSpy from "@/components/scroll/ScrollSpy";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Inwex",
    description: "Intelligent Network Warehouse and Inventory Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={poppins.className} >
                <ThemeProvider>
                    <AppProviders>
                        <ScrollOnRefresh />
                        <ScrollSpy />
                        {children}
                        <Toaster richColors position="top-right" />
                    </AppProviders>
                </ThemeProvider>
            </body>
        </html>
    );
}
