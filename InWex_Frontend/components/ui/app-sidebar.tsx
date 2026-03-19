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
import { NonStaffItems, staffItems } from "../config/sidebar/sidebarItems"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

const AppSidebar = ({ role }: { role: string }) => {
    const pathname = usePathname()
    const { logout } = useAuth()
    const mainItems = role === "staff" ? staffItems : NonStaffItems

    return (
        <Sidebar className="border-none flex flex-col justify-between">
            {/* Logo */}
            <SidebarHeader className="h-45 flex items-center text-4xl font-light mt-15 mr-3">
                <Link href="/">
                    <Image src="/logo/InwexUpdatedTransparent.png" alt="InWex Logo" width={110} height={110} priority />
                </Link>
            </SidebarHeader>

            {/* Main */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => {
                                const active = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title} className="mb-1">
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.url}
                                                className={`
                                                    flex text-sm! items-center gap-5
                                                    px-4 py-6 transition-colors
                                                    ${active
                                                        ? "text-white"
                                                        : "text-neutral-400 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <item.icon className="h-4! w-4! ml-4" />
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
                    <SidebarMenuItem className="mb-1">
                        <SidebarMenuButton
                            className="flex text-sm! items-center gap-5 px-4 py-6 transition-colors text-neutral-400 hover:text-white"
                        >
                            <Settings className="h-4! w-4! ml-4" />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="mb-1">
                        <SidebarMenuButton
                            onClick={logout}
                            className="flex text-sm! items-center gap-5 px-4 py-6 transition-colors text-neutral-400 hover:text-white"
                        >
                            <LogOut className="h-4! w-4! ml-4" />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}

export default AppSidebar