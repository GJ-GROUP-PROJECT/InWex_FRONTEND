import { Orders, OrderStatusCount, Product } from "@/lib/types/types"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { OrderValues } from "@/lib/schemas/order/addOrders.schema"
import axios from "axios"

export type OrderContextType = {
    orders: Orders[]
    count: number | null
    nextUrl: string | null
    isFetchingMore: boolean
    selectedOrder: Orders[]
    pendingOrder: OrderValues | null
    productCache: Record<string, Product>
    orderStatusCount: OrderStatusCount
    isLoading: boolean
    error: string | null
    fetchOrders: (showLoading: boolean) => Promise<void>
    loadMore: () => void
    selectOrder: (reference: string) => void
    clearSelectedOrder: () => void
    fetchSelectedOrder: (showLoading?: boolean) => Promise<void>
    fetchOrderByReferenceId: (query: string, showLoading?: boolean) => Promise<void>
    fetchOrderByClientId: (query: string, showLoading?: boolean) => Promise<void>
    fetchOrderStatusCount: () => Promise<void>
    shippingOrder: (orderId: number) => Promise<void>
    cancelOrder: (orderId: number) => Promise<void>
    completeOrder: (orderId: number) => Promise<void>
    returnOrder: (orderId: number) => Promise<void>
    downloadOrder: (orderId: number) => Promise<void>
    addOrder: (order: OrderValues) => Promise<void>
    deleteOrder: (orderId: number) => Promise<void>
    stageOrder: (order: OrderValues) => void
    cacheProducts: (products: Product[]) => void
    clearPendingOrder: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data
        return Array.isArray(data)
            ? data[0]
            : data?.detail ?? data?.[0] ?? fallback
    }
    return fallback
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orderStatusCount, setOrderStatusCount] = useState<OrderStatusCount>({ request: 0, in_progress: 0, delivered: 0, return: 0 })
    const [orders, setOrders] = useState<Orders[]>([])
    const [count, setCount] = useState<number | null>(null)
    const [nextUrl, setNextUrl] = useState<string | null>(null)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Orders[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user, isLoading: authLoading } = useAuth()

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

    const stageOrder = useCallback((order: OrderValues) => {
        setPendingOrder(order)
        localStorage.setItem("inwex_draft_order", JSON.stringify(order))
    }, [])

    const cacheProducts = useCallback((products: Product[]) => {
        setProductCache(prev => {
            const updated = { ...prev, ...Object.fromEntries(products.map(p => [p.id, p])) }
            localStorage.setItem("inwex_product_cache", JSON.stringify(updated))
            return updated
        })
    }, [])

    const clearPendingOrder = useCallback(() => {
        setPendingOrder(null)
        setProductCache({})
        localStorage.removeItem("inwex_draft_order")
        localStorage.removeItem("inwex_product_cache")
    }, [])

    const selectOrder = useCallback((reference: string) => {
        localStorage.setItem("inwex_selected_order_ref", reference)
    }, [])

    const clearSelectedOrder = useCallback(() => {
        localStorage.removeItem("inwex_selected_order_ref")
        setSelectedOrder([])
    }, [])

    const fetchOrders = useCallback(async (reset = false) => {
        if (reset) setIsLoading(true)
        try {
            const res = await api.get("products/get-orders")
            const data = res.data
            setOrders(data.results)
            setCount(data.count)
            setNextUrl(data.next ?? null)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to fetch orders")
            setError(message)
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const loadMore = useCallback(async () => {
        if (!nextUrl || isFetchingMore) return
        setIsFetchingMore(true)
        try {
            const url = nextUrl.replace(/^https?:\/\/[^/]+/, "")
            const res = await api.get(url)
            const data = res.data
            setOrders(prev => [...prev, ...data.results])
            setNextUrl(data.next ?? null)
        } catch {
            console.error("Failed to load more orders")
        } finally {
            setIsFetchingMore(false)
        }
    }, [nextUrl, isFetchingMore])

    const fetchOrderByReferenceId = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/products/get-order-detail?id=${query}`)
            setSelectedOrder(res.data.results)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to fetch order")
            setError(message)
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchSelectedOrder = useCallback(async (showLoading = true) => {
        const ref = localStorage.getItem("inwex_selected_order_ref")
        if (!ref) return
        await fetchOrderByReferenceId(ref, showLoading)
    }, [fetchOrderByReferenceId])

    const fetchOrderByClientId = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/products/client-orders?search=${query}`)
            setOrders(res.data.results)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to fetch orders")
            setError(message)
            toast.error(message)
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchOrderStatusCount = useCallback(async () => {
        try {
            const res = await api.get("/products/get-count-for-dashboard")
            setOrderStatusCount(res.data)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to fetch order type count")
            setError(message)
            toast.error(message)
        }
    }, [])

    const shippingOrder = useCallback(async (orderId: number) => {
        try {
            await api.post(`/products/order/${orderId}/shipping`)
            toast.success("Order marked as in-progress")
            await fetchOrders(false)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to mark order")
            setError(message)
            toast.error(message)
        }
    }, [fetchOrders])

    const cancelOrder = useCallback(async (orderId: number) => {
        try {
            await api.post(`/products/order/${orderId}/cancel`)
            toast.success("Order marked as cancelled")
            await fetchOrders(false)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to cancel order")
            setError(message)
            toast.error(message)
        }
    }, [fetchOrders])

    const completeOrder = useCallback(async (orderId: number) => {
        try {
            await api.post(`/products/order/${orderId}/complete`)
            toast.success("Order marked as delivered")
            await fetchOrders(false)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to complete order")
            setError(message)
            toast.error(message)
        }
    }, [fetchOrders])

    const returnOrder = useCallback(async (orderId: number) => {
        try {
            await api.post(`/products/order/${orderId}/return_order`)
            toast.success("Order returned successfully")
            await fetchOrders(false)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to return order")
            setError(message)
            toast.error(message)
        }
    }, [fetchOrders])

    const downloadOrder = useCallback(async (orderId: number) => {
        setError(null)
        try {
            const res = await api.get(`/products/download-order-report?order_id=${orderId}`, {
                responseType: "blob",
            })
            const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }))
            const link = document.createElement('a')
            link.href = url
            link.download = `invoice-${orderId || "file"}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to download invoice")
            setError(message)
            toast.error(message)
        }
    }, [])

    const addOrder: OrderContextType['addOrder'] = useCallback(async (order) => {
        try {
            await api.post("/products/order", order)
            toast.success("Order added successfully")
            await fetchOrders(true)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to add order")
            toast.error(message)
        }
    }, [fetchOrders])

    const deleteOrder: OrderContextType['deleteOrder'] = useCallback(async (orderId: number) => {
        try {
            await api.delete(`/products/order/${orderId}`)
            toast.success("Order deleted successfully")
            await fetchOrders(true)
        } catch (err) {
            const message = extractErrorMessage(err, "Failed to delete order")
            toast.error(message)
        }
    }, [fetchOrders])

    useEffect(() => {
        if (!authLoading && !user) {
            setOrders([])
            setSelectedOrder([])
            setOrderStatusCount({ request: 0, in_progress: 0, delivered: 0, return: 0 })
            clearPendingOrder()
        }
    }, [user, authLoading, clearPendingOrder])

    return (
        <OrderContext.Provider
            value={{
                orders,
                count,
                nextUrl,
                isFetchingMore,
                selectedOrder,
                pendingOrder,
                productCache,
                orderStatusCount,
                isLoading,
                error,
                fetchOrders,
                loadMore,
                selectOrder,
                clearSelectedOrder,
                fetchSelectedOrder,
                fetchOrderByReferenceId,
                fetchOrderByClientId,
                fetchOrderStatusCount,
                shippingOrder,
                cancelOrder,
                completeOrder,
                returnOrder,
                downloadOrder,
                addOrder,
                deleteOrder,
                stageOrder,
                cacheProducts,
                clearPendingOrder,
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