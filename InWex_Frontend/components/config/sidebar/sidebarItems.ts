import {
    Home,
    Package,
    ShoppingCart,
    Truck,
    Users,
    Warehouse,
} from "lucide-react"

export const staffItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Inventory", url: "/dashboard/inventory", icon: Package },
    { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
    { title: "Shipping", url: "/dashboard/shipping", icon: Truck },
]

export const NonStaffItems = [
    ...staffItems,
    { title: "Staff", url: "/dashboard/staff", icon: Users },
    { title: "Warehouse", url: "/dashboard/warehouse", icon: Warehouse }
]