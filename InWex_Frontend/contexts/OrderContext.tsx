import { Orders } from "@/lib/types/types"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { OrderValues } from "@/lib/schemas/order/addOrders.schema"

export type OrderContextType = {
    orders: Orders[]
    isLoading: boolean
    error: string | null
    fetchOrders: (showLoading: boolean) => Promise<void>
    addOrder: (order: OrderValues) => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider => ({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Orders[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchOrders = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        try {
            const res = await api.get("/products/get-orders")
            setOrders(res.data.results)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setOrders([])
        }
    }, [user])


    const addOrder: OrderContextType['addOrder'] = async (order) => {
        try {
            await api.post("/products/order", order)
            toast.success("Order added successfully")
            await fetchOrders(true)
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add product")
        }
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                isLoading,
                error,
                fetchOrders,
                addOrder
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
