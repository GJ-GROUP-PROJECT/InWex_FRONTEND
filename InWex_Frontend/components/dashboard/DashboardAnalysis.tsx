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

export default function DashboardAnalysis() {
    const { lowStockItems, mostInStockItems, mostReorderedItems, mostSoldItems, isLoading, fetchLowStock, fetchStockReport } = useDashboard()

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
            <div className="w-full space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <Skeleton className="lg:col-span-2 h-100" />
                    <Skeleton className="h-100" />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                    <Skeleton className="h-75" />
                    <Skeleton className="h-75" />
                </div>
            </div>
        )
    }


    return (
        <div className="w-full space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                    title="Total Revenue Units"
                    value="1,626"
                    subValue="+12% vs last month"
                    icon={<TrendingUp className="text-emerald-500" size={18} />}
                />
                <KPICard
                    title="Critical Low Stock"
                    value={`${lowStockItems.length}`}
                    subValue="Immediate restock needed"
                    icon={<AlertTriangle className="text-amber-500" size={18} />}
                />
                <KPICard
                    title="Inventory Health"
                    value="94%"
                    subValue="System efficiency"
                    icon={<Warehouse className="text-blue-500" size={18} />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Sales Performance</h2>
                            <p className="text-zinc-500 text-sm font-medium mt-1">Units sold per product SKU</p>
                        </div>
                        <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Live</Badge>
                    </div>

                    <div className="bg-zinc-950 p-8 rounded-2xl">
                        <ChartContainer config={chartConfig} className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topSoldProducts} layout="vertical" margin={{ left: -20, right: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="product_name"
                                        type="category"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                                        width={140}
                                    />
                                    <ChartTooltip cursor={{ fill: '#121212' }} content={<ChartTooltipContent hideLabel />} />
                                    <Bar
                                        dataKey="total_sold"
                                        radius={[0, 4, 4, 0]}
                                        barSize={20}
                                        fill="#ffffff"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>

                <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900/50">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Package className="w-4 h-4 text-zinc-500" /> Stock Leaders
                        </h2>
                        <p className="text-zinc-600 text-xs font-bold uppercase tracking-tighter mt-1">High availability</p>
                    </div>

                    <div className="space-y-1">
                        {mostInStockItems.slice(0, 6).map((item, index) => (
                            <div key={`${item.product__sku}-${index}`} className="flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-zinc-900/40 transition-all group">
                                <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-black text-zinc-700 group-hover:text-zinc-400 transition-colors">
                                    0{index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-zinc-200 truncate">{item.product__name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{item.product__sku}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-black text-white">{item.quantity.toLocaleString()}</span>
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter">Units</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900/50">
                    <div className="flex items-center gap-2 mb-6">
                        <RefreshCw className="w-4 h-4 text-zinc-500" />
                        <h3 className="text-lg font-black uppercase tracking-widest text-white">Restock Velocity</h3>
                    </div>

                    <div className="overflow-hidden">
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
                                        <TableCell className="px-0 py-4">
                                            <div className="font-bold text-zinc-200">{item.product__name}</div>
                                            <div className="text-[10px] text-zinc-600 font-bold uppercase">{item.product__sku}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[11px] font-black text-zinc-400 uppercase tracking-tight">
                                                {item.reorder_count} Orders
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right px-0 font-black text-white">
                                            {item.total_received.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <ArrowDown className="w-4 h-4 text-red-500" />
                        <h3 className="text-lg font-black uppercase tracking-widest text-white">Critical Shortages</h3>
                    </div>

                    <div className="space-y-3">
                        {lowStockItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-2xl border border-transparent hover:border-zinc-900 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`h-1.5 w-1.5 rounded-full ${item.quantity <= item.reorder_point * 0.25 ? "bg-red-600" : "bg-amber-600"}`} />
                                    <div>
                                        <div className="font-bold text-white text-sm">{item.product.name}</div>
                                        <div className="text-[10px] text-zinc-600 font-black uppercase">Min threshold: {item.reorder_point}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className={`text-sm font-black ${item.quantity <= item.reorder_point * 0.25 ? "text-red-500" : "text-amber-500"}`}>
                                            {item.quantity}
                                        </span>
                                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">Current</p>
                                    </div>
                                    <button className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
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