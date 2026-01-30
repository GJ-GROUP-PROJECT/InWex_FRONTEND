"use client"

import { api } from "@/lib/api"
import { Product } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"

type ProductContextType = {
    products: Product[]
    isLoading: boolean
    error: string | null
    // addProduct: (product: Product) => void
    // updateProduct: (productId: string, updatedProduct: Partial<Product>) => void
    // deleteProduct: (productId: string) => void
    refreshProducts: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem('token')
            console.log("Fetched token:", token)

            if (!token) throw new Error("No authentication token found")

            const res = await api.get('/products/get-products', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setProducts(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <ProductContext.Provider
            value={{
                products,
                isLoading,
                error,
                // addProduct,
                // updateProduct,
                // deleteProduct,
                refreshProducts: fetchProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext)
    if (!context) throw new Error("useProducts must be used within ProductProvider")
    return context
}