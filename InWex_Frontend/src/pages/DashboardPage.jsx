import { MetricCard } from "../components/MetricCard";
import { RecentActivity } from "../components/RecentActivity";
import { InventoryChart } from "../components/InventoryChart";
import { QuickActions } from "../components/QuickActions";
import { Package, ShoppingCart, Truck, TrendingUp } from "lucide-react";

const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Inventory"
                    value="12,458"
                    change="+5.2% from last month"
                    changeType="positive"
                    icon={Package}
                />
                <MetricCard
                    title="Pending Orders"
                    value="89"
                    change="-2.1% from yesterday"
                    changeType="negative"
                    icon={ShoppingCart}
                />
                <MetricCard
                    title="Active Shipments"
                    value="23"
                    change="+12.5% from last week"
                    changeType="positive"
                    icon={Truck}
                />
                <MetricCard
                    title="Warehouse Efficiency"
                    value="94.7%"
                    change="+0.8% from last month"
                    changeType="positive"
                    icon={TrendingUp}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Inventory Flow</h2>
                    <InventoryChart />
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <QuickActions />
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;