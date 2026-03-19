"use client"

import { api } from "@/lib/api"
import { Category, Product } from "@/lib/types/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { ProductValues } from "@/lib/schemas/product/addProduct.schema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { PAGINATION_URL, PAGINATION_URL_FOR_SEARCH } from "@/components/config"

type UpdateProductPayload = Omit<Partial<Product>, 'image'> & { image?: File }

type ProductContextType = {
    products: Product[]
    categories: Category[]
    count: number | null
    isLoading: boolean
    error: string | null
    fetchProducts: (showLoading: boolean, url?: string) => Promise<void>
    fetchProductBySlug: (showLoading: boolean, slug: string) => Promise<void>
    fetchProductBySearch: (query: string, showLoading?: boolean) => Promise<void>
    fetchCategory: () => Promise<void>
    addProduct: (product: ProductValues) => Promise<void>
    updateProduct: (productId: number, updatedProduct: UpdateProductPayload) => Promise<void>
    deleteProduct: (productId: number) => Promise<void>
    selectedProduct: Product | null
    setSelectedProduct: (p: Product | null) => void
    goToPage: (page: number) => void
    goToNextPage: () => void
    goToPrevPage: () => void
    hasNext: boolean
    hasPrev: boolean
    total_pages: number
    current_page: number
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [pagination, setPagination] = useState({
        next: null as string | null,
        prev: null as string | null,
        total_pages: null as number | null,
        current_page: 1
    })
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [count, setCount] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const router = useRouter()

    const goToPage = (page: number) => {
        let url: string
        if (searchQuery) {
            url = `${PAGINATION_URL_FOR_SEARCH}?page=${page}&product=${searchQuery}&`
        }
        else {
            url = `${PAGINATION_URL}?page=${page}`
        }
        fetchProducts(true, url);
    }

    const goToNextPage = () => {
        if (pagination.next) {
            fetchProducts(true, pagination.next)
        }
    }

    const goToPrevPage = () => {
        if (pagination.prev) {
            fetchProducts(true, pagination.prev)
        }
    }

    const fetchProducts = useCallback(async (showLoading = true, url?: string) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const endPoint = url || '/products/get-products'
            const res = await api.get(endPoint)

            setProducts(res.data.results)
            setCount(res.data.count)

            setPagination({
                next: res.data.next,
                prev: res.data.previous,
                total_pages: res.data.total_pages,
                current_page: res.data.current_page
            })

            if (!url) {
                setSearchQuery("");
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchProductBySlug = useCallback(async (showLoading = true, slug: string) => {
        if (showLoading) setIsLoading(true)
        setError(null)

        try {
            const res = await api.get(`/api/warehouse/get-product?slug=${slug}`)
            setSelectedProduct(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchProductBySearch = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        setSearchQuery(query)
        try {
            const res = await api.get(`products/product-search?product=${query}`)
            setProducts(res.data.results)

            setPagination({
                next: res.data.next,
                prev: res.data.previous,
                total_pages: res.data.total_pages,
                current_page: res.data.current_page
            })
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchCategory = useCallback(async () => {
        try {
            const res = await api.get('/products/get-categories')
            setCategories(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setProducts([])
            setCategories([])
            setCount(null)
            setPagination({
                next: null,
                prev: null,
                total_pages: null,
                current_page: 1
            })
            setError(null)
        }
    }, [user])

    const addProduct: ProductContextType['addProduct'] = async (product) => {
        try {
            const formData = new FormData()
            Object.entries(product).forEach(([key, value]) => {
                if (value !== undefined) formData.append(key, value as string | Blob)
            })

            await api.post("/products/add-products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            toast.success("Product added successfully")
            await fetchProducts(true)
            router.push("/dashboard/inventory/")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add product")
        }
    }

    const updateProduct: ProductContextType['updateProduct'] = async (productId, updatedProduct) => {
        try {
            const formData = new FormData()
            Object.entries(updatedProduct).forEach(([key, value]) => {
                if (value !== undefined) formData.append(key, value as string | Blob)
            })

            await api.put(`/products/add-products/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            await fetchProducts(true)
            toast.success("Product updated successfully")
            router.push("/dashboard/inventory/")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update product")
        }
    }

    const deleteProduct: ProductContextType['deleteProduct'] = async (productId) => {
        try {
            await api.delete(`/products/add-products/${productId}`)
            await fetchProducts(true);
            toast.success("Product deleted successfully")
            router.push("/dashboard/inventory/")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete product")
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                count,
                categories,
                isLoading,
                error,
                fetchProducts,
                fetchProductBySlug,
                fetchProductBySearch,
                fetchCategory,
                addProduct,
                updateProduct,
                deleteProduct,
                selectedProduct,
                setSelectedProduct,
                goToPage,
                goToNextPage,
                goToPrevPage,
                hasNext: !!pagination.next,
                hasPrev: !!pagination.prev,
                total_pages: pagination.total_pages ?? 0,
                current_page: pagination.current_page
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