import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { api } from "@/lib/api"
import { LowStockItem, MostInStockItem, MostReorderedItem, MostSoldItem, ProductProfit, StockReportResponse, TopProduct, WarehouseEfficiency, WarehouseProfit } from "@/lib/types/AnalysisTypes"
import axios from "axios"

export type DashboardContextType = {
    lowStockItems: LowStockItem[]
    mostInStockItems: MostInStockItem[]
    mostReorderedItems: MostReorderedItem[]
    mostSoldItems: MostSoldItem[]
    productProfit: ProductProfit[]
    warehouseProfit: WarehouseProfit[]
    topProducts: TopProduct[]
    warehouseEfficiency: WarehouseEfficiency[]
    isLoading: boolean
    error: string | null
    fetchLowStock: (showLoading?: boolean) => Promise<void>
    fetchStockReport: (showLoading?: boolean) => Promise<void>
    fetchProductProfit: (showLoading?: boolean) => Promise<void>
    fetchWarehouseProfit: (showLoading?: boolean) => Promise<void>
    fetchTopProducts: (showLoading?: boolean) => Promise<void>
    fetchWarehouseEfficiency: (showLoading?: boolean) => Promise<void>
    downloadReport: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data
        return Array.isArray(data)
            ? data[0]
            : data?.detail ?? data?.[0] ?? fallback
    }
    return fallback
}

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([])
    const [mostInStockItems, setMostInStockItems] = useState<MostInStockItem[]>([])
    const [mostReorderedItems, setMostReorderedItems] = useState<MostReorderedItem[]>([])
    const [mostSoldItems, setMostSoldItems] = useState<MostSoldItem[]>([])
    const [productProfit, setProductProfit] = useState<ProductProfit[]>([])
    const [topProducts, setTopProducts] = useState<TopProduct[]>([])
    const [warehouseEfficiency, setWarehouseEfficiency] = useState<WarehouseEfficiency[]>([])
    const [warehouseProfit, setWarehouseProfit] = useState<WarehouseProfit[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchLowStock = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get<LowStockItem[]>("/products/stock-data/low")
            setLowStockItems(res.data)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch low stock"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchStockReport = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get<StockReportResponse>("/products/stock-data/report")
            setMostInStockItems(res.data.most_in_stock)
            setMostReorderedItems(res.data.most_reordered)
            setMostSoldItems(res.data.most_sold)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch stock report"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchProductProfit = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/api/warehouse/get-product-profit")
            setProductProfit(res.data.results)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch product profit"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchWarehouseProfit = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/api/warehouse/get-warehouse-profit")
            setWarehouseProfit(res.data.results)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch warehouse profit"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchTopProducts = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/api/warehouse/get-top-products")
            setTopProducts(res.data.results)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch top products"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchWarehouseEfficiency = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/api/warehouse/warehouse-efficiency")
            setWarehouseEfficiency(res.data.results)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch warehouse efficiency"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const downloadReport = useCallback(async () => {
        setError(null)
        try {
            const res = await api.get("/products/download-report", { responseType: "blob" })
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
            const link = document.createElement('a')
            link.href = url
            link.download = `stock-report-${new Date().toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-')}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to download report"))
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setLowStockItems([])
            setMostInStockItems([])
            setMostReorderedItems([])
            setMostSoldItems([])
            setProductProfit([])
            setWarehouseProfit([])
            setTopProducts([])
            setWarehouseEfficiency([])
            setError(null)
        }
    }, [user])

    return (
        <DashboardContext.Provider
            value={{
                lowStockItems,
                mostInStockItems,
                mostReorderedItems,
                mostSoldItems,
                productProfit,
                warehouseProfit,
                topProducts,
                warehouseEfficiency,
                isLoading,
                error,
                fetchLowStock,
                fetchStockReport,
                fetchProductProfit,
                fetchWarehouseProfit,
                fetchTopProducts,
                fetchWarehouseEfficiency,
                downloadReport
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (!context) throw new Error("useDashboard must be used within DashboardProvider")
    return context
}