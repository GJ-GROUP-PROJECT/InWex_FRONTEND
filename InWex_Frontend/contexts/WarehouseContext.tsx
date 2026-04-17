"use client"

import { WarehouseValues } from "@/lib/schemas/warehouse/addWarehouse.schema"
import { Product, Warehouse } from "@/lib/types/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"
import axios from "axios"

export type WarehouseContextType = {
    warehouses: Warehouse[]
    products: Product[]
    count: number | null
    isLoading: boolean
    error: string | null
    fetchWarehouses: (showLoading?: boolean) => Promise<void>
    fetchProducts: (warehouseId: number, showLoading?: boolean) => Promise<void>
    fetchWarehouseBySearch: (query: string, showLoading?: boolean) => Promise<void>
    addWarehouse: (data: WarehouseValues) => Promise<void>
    updateWarehouse: (id: number, data: Partial<Warehouse>) => Promise<void>
    deleteWarehouse: (id: number) => Promise<void>
    selectedWarehouse: Warehouse | null
    setSelectedWarehouse: (w: Warehouse | null) => void
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined)

const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data
        return Array.isArray(data)
            ? data[0]
            : data?.detail ?? data?.[0] ?? fallback
    }
    return fallback
}

export const WarehouseProvider = ({ children }: { children: React.ReactNode }) => {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [count, setCount] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
    const { user } = useAuth()
    const router = useRouter()

    const fetchWarehouses = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/warehouse/warehouse")
            setWarehouses(res.data.results)
            setCount(res.data.count)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch warehouses"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchProducts = useCallback(async (warehouseId: number, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`api/warehouse/get-warehouse-products?warehouse_id=${warehouseId}`)
            setProducts(res.data.results)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch warehouse products"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchWarehouseBySearch = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        try {
            const res = await api.get(`/api/warehouse/warehouses-search?name=${query}`)
            setWarehouses(res.data)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to search warehouses"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const addWarehouse: WarehouseContextType['addWarehouse'] = async (warehouse) => {
        try {
            await api.post("/warehouse/warehouse", warehouse)
            await fetchWarehouses(true)
            toast.success("Warehouse added successfully")
            router.push("/dashboard/warehouse")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to add warehouse"))
        }
    }

    const updateWarehouse: WarehouseContextType['updateWarehouse'] = async (warehouseId, updatedWarehouse) => {
        try {
            await api.patch(`/warehouse/warehouse/${warehouseId}`, updatedWarehouse)
            await fetchWarehouses(true)
            toast.success("Warehouse updated successfully")
            router.push("/dashboard/warehouse")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to update warehouse"))
        }
    }

    const deleteWarehouse: WarehouseContextType['deleteWarehouse'] = async (warehouseId) => {
        try {
            await api.delete(`/warehouse/warehouse/${warehouseId}`)
            await fetchWarehouses(true)
            toast.success("Warehouse deleted successfully")
            router.push("/dashboard/warehouses")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to delete warehouse"))
        }
    }

    useEffect(() => {
        if (!user) {
            setWarehouses([])
            setProducts([])
            setError(null)
        }
    }, [user])

    return (
        <WarehouseContext.Provider
            value={{
                warehouses,
                products,
                count,
                isLoading,
                error,
                fetchWarehouses,
                fetchProducts,
                fetchWarehouseBySearch,
                addWarehouse,
                updateWarehouse,
                deleteWarehouse,
                selectedWarehouse,
                setSelectedWarehouse,
            }}
        >
            {children}
        </WarehouseContext.Provider>
    )
}

export const useWarehouse = () => {
    const context = useContext(WarehouseContext)
    if (!context) throw new Error("useWarehouse must be used within WarehouseProvider")
    return context
}