"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Package, AlertTriangle, TrendingUp, ArrowDown, RefreshCw, Warehouse } from "lucide-react";
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
    const { lowStockItems, mostInStockItems, mostReorderedItems, mostSoldItems, isLoading, fetchLowStock, fetchStockReport } = useDashboard()
    const router = useRouter()

    useEffect(() => {
        fetchLowStock(true)
        fetchStockReport(true)
    }, [fetchLowStock, fetchStockReport])

    const topSoldProducts = useMemo(() => {
        return mostSoldItems.map((item) => ({
            product_name: item.product__name,
            total_sold: item.total_sold,
        }))
    }, [mostSoldItems])

    const chartConfig: ChartConfig = {
        total_sold: { label: "Total Units Sold", color: "#ffffff" }
    }

    if (isLoading) {
        return (
            <div className="w-full space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Skeleton className="lg:col-span-2 h-72" />
                    <Skeleton className="h-72" />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Skeleton className="h-56" />
                    <Skeleton className="h-56" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KPICard
                    title="Total Revenue Units"
                    value="1,626"
                    subValue="+12% vs last month"
                    icon={<TrendingUp className="text-emerald-500" size={14} />}
                />
                <KPICard
                    title="Critical Low Stock"
                    value={`${lowStockItems.length}`}
                    subValue="Immediate restock needed"
                    icon={<AlertTriangle className="text-amber-500" size={14} />}
                />
                <KPICard
                    title="Inventory Health"
                    value="94%"
                    subValue="System efficiency"
                    icon={<Warehouse className="text-blue-500" size={14} />}
                />
            </div>

            {/* Chart + Stock Leaders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Sales Performance</h2>
                            <p className="text-zinc-500 text-xs font-medium mt-0.5">Units sold per product SKU</p>
                        </div>
                        <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Live</Badge>
                    </div>

                    <div className="bg-zinc-950 p-5 rounded-xl">
                        <ChartContainer config={chartConfig} className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topSoldProducts} layout="vertical" margin={{ left: -20, right: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="product_name"
                                        type="category"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }}
                                        width={120}
                                    />
                                    <ChartTooltip cursor={{ fill: '#121212' }} content={<ChartTooltipContent hideLabel />} />
                                    <Bar
                                        dataKey="total_sold"
                                        radius={[0, 4, 4, 0]}
                                        barSize={14}
                                        fill="#ffffff"
                                    />
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

            {/* Restock Velocity + Critical Shortages */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/50">
                    <div className="flex items-center gap-1.5 mb-4">
                        <RefreshCw className="w-3 h-3 text-zinc-500" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">Restock Velocity</h3>
                    </div>

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

                <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-4">
                        <ArrowDown className="w-3 h-3 text-red-500" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">Critical Shortages</h3>
                    </div>

                    <div className="space-y-2">
                        {lowStockItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900/40 rounded-xl border border-transparent hover:border-zinc-900 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${item.quantity <= item.reorder_point * 0.25 ? "bg-red-600" : "bg-amber-600"}`} />
                                    <div>
                                        <div className="text-xs font-bold text-white">{item.product.name}</div>
                                        <div className="text-[9px] text-zinc-600 font-black uppercase">Min: {item.reorder_point}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className={`text-xs font-black ${item.quantity <= item.reorder_point * 0.25 ? "text-red-500" : "text-amber-500"}`}>
                                            {item.quantity}
                                        </span>
                                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">Current</p>
                                    </div>
                                    <button
                                        className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                                        onClick={() => router.push("/dashboard/orders")}
                                    >
                                        Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}