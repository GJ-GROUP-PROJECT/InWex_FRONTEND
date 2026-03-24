import { Product } from "./types"

export type KPICardProps = {
    title: string
    value: string
    subValue: string
    icon: React.ReactNode
}

export type LowStockItem = {
    id: number
    quantity: number
    reorder_point: number
    reorder_quantity: number
    last_updated: string
    product: Product
}

export type StockReportResponse = {
    most_sold: MostSoldItem[]
    most_in_stock: MostInStockItem[]
    most_reordered: MostReorderedItem[]
}

export type MostInStockItem = {
    id: number
    product__name: string
    product__sku: string
    quantity: number
}

export type MostReorderedItem = {
    id: number
    product__name: string
    product__sku: string
    reorder_count: number
    total_received: number
}

export type MostSoldItem = {
    id: number
    product__name: string
    product__sku: string
    total_sold: number
}

export type ProductProfit = {
    product_id: number
    product_name: string
    total_sold: number
    revenue: number
    cost: number
    profit: number
}

export type WarehouseProfit = {
    warehouse_id: number
    warehouse_name: string
    total_revenue: number
    total_cost: number
    total_profit: number
}

export type TopProduct = {
    product_id: number
    product_name: string
    profit: number
    total_sold: number
}

export type WarehouseEfficiency = {
    profit_per_unit: number
    total_profit: number
    total_qty: number
    warehouse_id: number
    warehouse_name: string
}