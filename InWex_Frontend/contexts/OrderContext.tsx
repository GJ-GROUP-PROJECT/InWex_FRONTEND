import { Orders, Product } from "@/lib/types/types"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { OrderValues } from "@/lib/schemas/order/addOrders.schema"

export type OrderContextType = {
    orders: Orders[]
    selectedOrder: Orders[]
    pendingOrder: OrderValues | null
    productCache: Record<string, Product>
    isLoading: boolean
    error: string | null
    fetchOrders: (showLoading: boolean) => Promise<void>
    fetchOrderByReferenceId: (query: string, showLoading?: boolean) => Promise<void>
    addOrder: (order: OrderValues) => Promise<void>
    stageOrder: (order: OrderValues) => void
    cacheProducts: (products: Product[]) => void
    clearPendingOrder: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<Orders[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Orders[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const [pendingOrder, setPendingOrder] = useState<OrderValues | null>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("inwex_draft_order")
            return saved ? JSON.parse(saved) : null
        }
        return null
    })

    const [productCache, setProductCache] = useState<Record<string, Product>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("inwex_product_cache")
            return saved ? JSON.parse(saved) : {}
        }
        return {}
    })

    const stageOrder = (order: OrderValues) => {
        setPendingOrder(order)
        localStorage.setItem("inwex_draft_order", JSON.stringify(order))
    }

    const cacheProducts = (products: Product[]) => {
        setProductCache(prev => {
            const updated = { ...prev, ...Object.fromEntries(products.map(p => [p.id, p])) }
            localStorage.setItem("inwex_product_cache", JSON.stringify(updated))
            return updated
        })
    }

    const clearPendingOrder = () => {
        setPendingOrder(null)
        setProductCache({})
        localStorage.removeItem("inwex_draft_order")
        localStorage.removeItem("inwex_product_cache")
    }

    const fetchOrders = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/products/get-orders")
            setOrders(res.data.results)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchOrderByReferenceId = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/products/get-order-detail?id=${query}`)
            setSelectedOrder(res.data.results)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setOrders([])
            setSelectedOrder([])
        }
    }, [user])

    const addOrder: OrderContextType['addOrder'] = async (order) => {
        try {
            await api.post("/products/order", order)
            toast.success("Order added successfully")
            await fetchOrders(true)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add product")
        }
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                selectedOrder,
                pendingOrder,
                productCache,
                isLoading,
                error,
                fetchOrders,
                fetchOrderByReferenceId,
                addOrder,
                stageOrder,
                cacheProducts,
                clearPendingOrder
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => {
    const context = useContext(OrderContext)
    if (!context) throw new Error("useOrder must be used within OrderProvider")
    return context
}