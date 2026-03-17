"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import NotificationBell from "./NotificationBell"
import CartDrawer from "../orders/CartDrawer"

interface NavbarProps {
    leftContent?: React.ReactNode
}

const Navbar = ({ leftContent }: NavbarProps) => {
    const { user, role } = useAuth()

    const userRole = role?.manager
        ? "Manager"
        : role?.business
            ? "Business"
            : "Warehouse Staff"

    if (!user) return null

    return (
        <div className="flex items-center justify-between w-full px-6 py-4 bg-black/50 backdrop-blur-md">
            <div className="flex-1 text-white">{leftContent}</div>

            <div className="flex items-center gap-2">
                <CartDrawer />

                <NotificationBell />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center pl-2 cursor-pointer">
                            <Avatar className="h-10 w-10 transition-all">
                                <AvatarImage src={user.avatar} className="object-cover" />
                                <AvatarFallback className="bg-zinc-900 text-zinc-400 font-black text-xs">
                                    {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={12}
                        className="w-80 p-0 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-5 bg-zinc-900/30">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-500 font-black">
                                        {user.fullname?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-white truncate">{user.fullname}</p>
                                    <p className="text-[11px] font-bold text-zinc-500 truncate uppercase tracking-tight">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-zinc-900 space-y-3">
                            <div className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Access Level</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                                    {userRole}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar