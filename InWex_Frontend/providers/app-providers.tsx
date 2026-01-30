"use client"

import { AuthProvider } from "@/contexts/AuthContext"
import { ProductProvider } from "@/contexts/ProductContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
        </AuthProvider >
    )
}