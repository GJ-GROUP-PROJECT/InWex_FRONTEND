"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Package, AlertTriangle, TrendingUp, ArrowDown, RefreshCw, Warehouse, DollarSign } from "lucide-react";
import {
    ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import KPICard from "./Analysis/KPICards";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function DashboardAnalysis() {
    const { lowStockItems, mostInStockItems, mostReorderedItems, mostSoldItems, productProfit, warehouseProfit, topProducts, warehouseEfficiency, isLoading, fetchLowStock, fetchStockReport, fetchProductProfit, fetchWarehouseProfit, fetchTopProducts, fetchWarehouseEfficiency } = useDashboard()
    const router = useRouter()

    useEffect(() => {
        fetchLowStock(true)
        fetchStockReport(true)
        fetchProductProfit(true)
        fetchWarehouseProfit(true)
        fetchTopProducts(true)
        fetchWarehouseEfficiency(true)
    }, [fetchLowStock, fetchStockReport, fetchProductProfit, fetchWarehouseProfit, fetchTopProducts, fetchWarehouseEfficiency])

    const topSoldProducts = useMemo(() => {
        return mostSoldItems.map((item) => ({
            product_name: item.product__name,
            total_sold: item.total_sold,
        }))
    }, [mostSoldItems])

    const profitChartData = useMemo(() => {
        return productProfit
            .sort((a, b) => b.revenue - a.revenue)
            .map((item) => ({
                product_name: item.product_name.length > 10 ? `${item.product_name.slice(0, 10)}…` : item.product_name,
                revenue: item.revenue,
                cost: item.cost,
                profit: item.profit,
            }))
    }, [productProfit])

    const totalRevenue = useMemo(() => {
        return productProfit.reduce((acc, item) => acc + item.revenue, 0)
    }, [productProfit])

    const totalProfit = useMemo(() => {
        return productProfit.reduce((acc, item) => acc + item.profit, 0)
    }, [productProfit])

    const stats = useMemo(() => {
        const totalQuantity = mostSoldItems.reduce((acc, item) => acc + (item.total_sold || 0), 0);
        const aov = totalQuantity > 0 ? totalRevenue / totalQuantity : 0;
        return { aov };
    }, [mostSoldItems, totalRevenue]);

    const salesChartConfig: ChartConfig = {
        total_sold: { label: "Total Units Sold", color: "#ffffff" }
    }

    const profitChartConfig: ChartConfig = {
        revenue: { label: "Revenue", color: "#ffffff" },
        cost: { label: "Cost", color: "#3f3f46" },
        profit: { label: "Profit", color: "#10b981" },
    }

    const warehouseProfitConfig: ChartConfig = {
        total_revenue: { label: "Revenue", color: "#ffffff" },
        total_cost: { label: "Cost", color: "#3f3f46" },
        total_profit: { label: "Profit", color: "#10b981" },
    }

    if (isLoading) {
        return (
            <div className="w-full space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Skeleton className="lg:col-span-2 h-72" />
                    <Skeleton className="h-72" />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Skeleton className="h-56" />
                    <Skeleton className="h-56" />
                </div>
                <Skeleton className="h-80" />
            </div>
        )
    }

    return (
        <div className="w-full space-y-8">

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Total Revenue"
                    value={`₹${totalRevenue.toLocaleString('en-IN')}`}
                    subValue="Across all products"
                    icon={<TrendingUp className="text-emerald-500" size={14} />}
                />
                <KPICard
                    title="Total Profit"
                    value={`₹${totalProfit.toLocaleString('en-IN')}`}
                    subValue="Net after cost"
                    icon={<DollarSign className="text-blue-500" size={14} />}
                />
                <KPICard
                    title="Critical Low Stock"
                    value={`${lowStockItems.length}`}
                    subValue="Immediate restock needed"
                    icon={<AlertTriangle className="text-amber-500" size={14} />}
                />
                <KPICard
                    title="Avg. Revenue / Unit"
                    value={`₹${stats.aov.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
                    subValue="Based on current sales volume"
                    icon={<TrendingUp className="text-emerald-500" size={14} />}
                />
            </div>

            {/* Sales Chart + Stock Leaders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Sales Performance</h2>
                            <p className="text-zinc-500 text-xs font-medium mt-0.5">Units sold per product</p>
                        </div>
                        <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Live</Badge>
                    </div>
                    <div className="bg-zinc-950 p-4 rounded-xl">
                        <ChartContainer config={salesChartConfig} className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topSoldProducts} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="product_name"
                                        type="category"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }}
                                        width={100}
                                        tickFormatter={(v) => v.length > 12 ? `${v.slice(0, 12)}…` : v}
                                    />
                                    <ChartTooltip cursor={{ fill: '#121212' }} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="total_sold" radius={[0, 4, 4, 0]} barSize={12} fill="#ffffff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>

                {/* Stock Leaders */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/50">
                    <div className="mb-4">
                        <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Package className="w-3 h-3 text-zinc-500" /> Stock Leaders
                        </h2>
                        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter mt-0.5">High availability</p>
                    </div>
                    <div className="space-y-0.5">
                        {mostInStockItems.slice(0, 6).map((item, index) => (
                            <div key={`${item.product__sku}-${index}`} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-zinc-900/40 transition-all group">
                                <div className="h-6 w-6 rounded-md bg-zinc-900 flex items-center justify-center text-[9px] font-black text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0">
                                    0{index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-zinc-200 truncate">{item.product__name}</p>
                                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">{item.product__sku}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xs font-black text-white">{item.quantity.toLocaleString()}</span>
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter">Units</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Restock Velocity + Critical Shortages + Warehouse Profit */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Restock Velocity */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/50">
                    <div className="flex items-center gap-1.5 mb-4">
                        <RefreshCw className="w-3 h-3 text-zinc-500" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">Restock Velocity</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-zinc-900/50">
                                    <TableHead className="text-[10px] uppercase font-black text-zinc-600 px-0">Product</TableHead>
                                    <TableHead className="text-[10px] uppercase font-black text-zinc-600">Frequency</TableHead>
                                    <TableHead className="text-right text-[10px] uppercase font-black text-zinc-600 px-0">Volume</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mostReorderedItems.map((item) => (
                                    <TableRow key={item.product__sku} className="border-zinc-900/50 hover:bg-zinc-900/20 transition-colors">
                                        <TableCell className="px-0 py-3">
                                            <div className="text-xs font-bold text-zinc-200">{item.product__name}</div>
                                            <div className="text-[9px] text-zinc-600 font-bold uppercase">{item.product__sku}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tight">
                                                {item.reorder_count} Orders
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right px-0 text-xs font-black text-white">
                                            {item.total_received.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Right column — Critical Shortages + Warehouse Profit */}
                <div className="flex flex-col gap-6">

                    {/* Critical Shortages */}
                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/50">
                        <div className="flex items-center gap-1.5 mb-4">
                            <ArrowDown className="w-3 h-3 text-red-500" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Critical Shortages</h3>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {lowStockItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900/40 rounded-xl border border-transparent hover:border-zinc-900 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${item.quantity <= item.reorder_point * 0.25 ? "bg-red-600" : "bg-amber-600"}`} />
                                        <div>
                                            <div className="text-xs font-bold text-white truncate max-w-35">{item.product.name}</div>
                                            <div className="text-[9px] text-zinc-600 font-black uppercase">Min: {item.reorder_point}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <span className={`text-xs font-black ${item.quantity <= item.reorder_point * 0.25 ? "text-red-500" : "text-amber-500"}`}>
                                                {item.quantity}
                                            </span>
                                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">Current</p>
                                        </div>
                                        <button
                                            className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-2 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shrink-0"
                                            onClick={() => router.push("/dashboard/orders")}
                                        >
                                            Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warehouse Profit */}
                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/50 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                                    <Warehouse className="w-3 h-3 text-zinc-500" /> Warehouse Profit
                                </h3>
                                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter mt-0.5">By facility</p>
                            </div>
                        </div>

                        {warehouseProfit.length <= 3 ? (
                            <div className="space-y-3">
                                {warehouseProfit.map((w) => {
                                    const margin = ((w.total_profit / w.total_revenue) * 100).toFixed(1)
                                    return (
                                        <div key={w.warehouse_id} className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-xs font-black text-white">{w.warehouse_name}</p>
                                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                    {margin}% margin
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-wider">Revenue</p>
                                                    <p className="text-xs font-black text-white mt-0.5">₹{w.total_revenue.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-wider">Cost</p>
                                                    <p className="text-xs font-black text-zinc-400 mt-0.5">₹{w.total_cost.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-wider">Profit</p>
                                                    <p className="text-xs font-black text-emerald-500 mt-0.5">₹{w.total_profit.toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${margin}%` }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <ChartContainer config={warehouseProfitConfig} className="h-44 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={warehouseProfit} margin={{ left: -10, right: 0, top: 0, bottom: 0 }} barGap={3} barCategoryGap="35%">
                                        <XAxis dataKey="warehouse_name" tickLine={false} axisLine={false} tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }} />
                                        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#71717a', fontSize: 9, fontWeight: 600 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                                        <ChartTooltip cursor={{ fill: '#18181b' }} content={<ChartTooltipContent />} formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                                        <Bar dataKey="total_revenue" radius={[4, 4, 0, 0]} barSize={16} fill="#ffffff" />
                                        <Bar dataKey="total_cost" radius={[4, 4, 0, 0]} barSize={16} fill="#3f3f46" />
                                        <Bar dataKey="total_profit" radius={[4, 4, 0, 0]} barSize={16} fill="#10b981" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Profit Chart */}
            <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900/50">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-4">
                    <div>
                        <h2 className="text-sm font-bold text-white tracking-tight">Product Profitability</h2>
                        <p className="text-zinc-500 text-xs font-medium mt-0.5">Revenue vs cost vs profit</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase"><span className="h-2 w-2 rounded-sm bg-white inline-block" /> Revenue</span>
                        <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase"><span className="h-2 w-2 rounded-sm bg-zinc-700 inline-block" /> Cost</span>
                        <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase"><span className="h-2 w-2 rounded-sm bg-emerald-500 inline-block" /> Profit</span>
                    </div>
                </div>

                <ChartContainer config={profitChartConfig} className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={profitChartData} margin={{ left: 0, right: 0, top: 0, bottom: 60 }} barGap={3} barCategoryGap="30%">
                            <XAxis
                                dataKey="product_name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#71717a', fontSize: 9, fontWeight: 600 }}
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#71717a', fontSize: 9, fontWeight: 600 }}
                                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                            />
                            <ChartTooltip
                                cursor={{ fill: '#18181b' }}
                                content={<ChartTooltipContent />}
                                formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                            />
                            <Bar dataKey="revenue" radius={[4, 4, 0, 0]} barSize={14} fill="#ffffff" />
                            <Bar dataKey="cost" radius={[4, 4, 0, 0]} barSize={14} fill="#3f3f46" />
                            <Bar dataKey="profit" radius={[4, 4, 0, 0]} barSize={14} fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>

            {/* Top Products + Warehouse Efficiency */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Top Products */}
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900/50">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Top Products</h2>
                            <p className="text-zinc-500 text-xs font-medium mt-0.5">Profit vs units sold</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase">
                                <span className="h-2 w-2 rounded-sm bg-emerald-500 inline-block" /> Profit
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase">
                                <span className="h-2 w-2 rounded-sm bg-zinc-600 inline-block" /> Units
                            </span>
                        </div>
                    </div>

                    <ChartContainer
                        config={{
                            profit: { label: "Profit", color: "#10b981" },
                            total_sold: { label: "Units Sold", color: "#52525b" },
                        }}
                        className="h-52 w-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topProducts.map((p) => ({
                                    ...p,
                                    product_name: p.product_name.length > 10
                                        ? `${p.product_name.slice(0, 10)}…`
                                        : p.product_name,
                                }))}
                                margin={{ left: 0, right: 0, top: 0, bottom: 48 }}
                                barGap={3}
                                barCategoryGap="30%"
                            >
                                <XAxis
                                    dataKey="product_name"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#71717a', fontSize: 9, fontWeight: 600 }}
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                />
                                <YAxis
                                    yAxisId="profit"
                                    orientation="left"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#71717a', fontSize: 9, fontWeight: 600 }}
                                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                                />
                                <YAxis
                                    yAxisId="units"
                                    orientation="right"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#71717a', fontSize: 9, fontWeight: 600 }}
                                />
                                <ChartTooltip
                                    cursor={{ fill: '#18181b' }}
                                    content={<ChartTooltipContent />}
                                    formatter={(value, name) =>
                                        name === "profit"
                                            ? `₹${Number(value).toLocaleString('en-IN')}`
                                            : `${value} units`
                                    }
                                />
                                <Bar yAxisId="profit" dataKey="profit" radius={[4, 4, 0, 0]} barSize={12} fill="#10b981" />
                                <Bar yAxisId="units" dataKey="total_sold" radius={[4, 4, 0, 0]} barSize={12} fill="#52525b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>

                {/* Warehouse Efficiency */}
                <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900/50">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Warehouse Efficiency</h2>
                            <p className="text-zinc-500 text-xs font-medium mt-0.5">Profit per unit by facility</p>
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">₹/unit</span>
                    </div>

                    <div className="space-y-3">
                        {warehouseEfficiency.map((w) => {
                            const maxProfitPerUnit = Math.max(...warehouseEfficiency.map(x => x.profit_per_unit))
                            const isHealthy = w.profit_per_unit >= (maxProfitPerUnit * 0.6)

                            return (
                                <div key={w.warehouse_id} className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${isHealthy ? "bg-emerald-500" : "bg-amber-500"}`} />
                                            <p className="text-xs font-black text-white">{w.warehouse_name}</p>
                                        </div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isHealthy ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"}`}>
                                            ₹{w.profit_per_unit.toLocaleString('en-IN', { maximumFractionDigits: 2 })} / unit
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-[9px] text-zinc-600 uppercase font-black tracking-wider">Total Profit</p>
                                            <p className="text-[11px] font-black text-white mt-0.5">₹{w.total_profit.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-zinc-600 uppercase font-black tracking-wider">Units Handled</p>
                                            <p className="text-[11px] font-black text-zinc-400 mt-0.5">{w.total_qty.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}