"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarGroup,
    SidebarFooter,
    SidebarGroupContent,
} from "./sidebar"

import {
    Home,
    Settings,
    Package,
    ShoppingCart,
    Truck,
    LogOut,
} from "lucide-react"

const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Inventory", url: "/dashboard/inventory", icon: Package },
    { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
    { title: "Shipping", url: "/dashboard/shipping", icon: Truck },
]

const bottomItems = [
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Log out", url: "/logout", icon: LogOut },
]

const AppSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar className="border-none">
            {/* Logo */}
            <SidebarHeader className="h-45 mt-20 flex items-center text-4xl font-light">
                Logo
            </SidebarHeader>

            {/* Main */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => {
                                const active = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title} className="mb-3">
                                        <SidebarMenuButton asChild className="">
                                            <Link
                                                href={item.url}
                                                className={`
                                                    flex text-lg! items-center gap-5
                                                    px-4 py-7 transition-colors
                                                    ${active
                                                        ? "text-white"
                                                        : "text-neutral-400 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <item.icon className="h-5! w-5! ml-7" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Bottom */}
            <SidebarFooter className="pb-10">
                <SidebarMenu>
                    {bottomItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link
                                    href={item.url}
                                    className="
                                        flex text-lg! items-center gap-5 px-4 py-7
                                        text-neutral-400
                                        hover:text-white"
                                >
                                    <item.icon className="h-5! w-5! ml-7" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
