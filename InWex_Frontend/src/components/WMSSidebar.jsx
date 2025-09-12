import {
    BarChart3,
    Package,
    ShoppingCart,
    Truck,
    Users,
    Settings,
    Home,
    ClipboardList,
    TrendingUp
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Truck, label: "Shipping", path: "/shipping" },
    { icon: ClipboardList, label: "Receiving", path: "/receiving" },
    { icon: Users, label: "Staff", path: "/staff" },
    { icon: TrendingUp, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export function WMSSidebar() {
    return (
        <aside className="bg-card border-r border-border w-64 h-full shadow-soft">
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? "bg-primary text-primary-foreground shadow-medium"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`
                                    }
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
