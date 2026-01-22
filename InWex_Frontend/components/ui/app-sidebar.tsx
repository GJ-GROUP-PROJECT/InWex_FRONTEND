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
    Settings,
    LogOut,
} from "lucide-react"
import { managerItems, staffItems } from "../config/sidebar/sidebarItems"

type Role = "staff" | "manager"

const bottomItems = [
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Log out", url: "/logout", icon: LogOut },
]

const AppSidebar = ({ role }: { role: Role }) => {
    const pathname = usePathname()

    const mainItems = role === "manager" ? managerItems : staffItems

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
