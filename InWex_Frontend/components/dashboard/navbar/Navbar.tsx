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
import { useState, useEffect } from "react"
import { Switch } from "../../ui/switch"
import { api } from "@/lib/api"

interface NavbarProps {
    leftContent?: React.ReactNode
}

const Navbar = ({ leftContent }: NavbarProps) => {
    const { user, role } = useAuth()
    const [notificationSound, setNotificationSound] = useState(true)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get("/accounts/settings")
                setNotificationSound(res.data.notification_sound)
            } catch (err) {
                console.error("Failed to fetch settings", err)
            }
        }
        if (user) fetchSettings()
    }, [user])

    const toggleNotificationSound = async (value: boolean) => {
        setNotificationSound(value)
        try {
            await api.patch("/accounts/settings", { notification_sound: value })
        } catch (err) {
            console.error("Failed to update notification sound", err)
            setNotificationSound(!value)
        }
    }

    const userRole = role?.manager
        ? "Manager"
        : role?.business
            ? "Business"
            : "Warehouse Staff"

    if (!user) return null

    return (
        <div className="flex items-center justify-between w-full px-4 py-3 bg-black/50 backdrop-blur-md">
            <div className="flex-1 text-white">{leftContent}</div>

            <div className="flex items-center gap-1.5">
                <CartDrawer />

                <NotificationBell />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center pl-1.5 cursor-pointer">
                            <Avatar className="h-8 w-8 transition-all">
                                <AvatarImage src={user.avatar} className="object-cover" />
                                <AvatarFallback className="bg-zinc-900 text-zinc-400 font-black text-[10px]">
                                    {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={10}
                        className="w-70 p-0 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-4 bg-zinc-900/30">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-500 font-black text-xs">
                                        {user.fullname?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="text-xs! font-black text-white truncate">{user.fullname}</p>
                                    <p className="text-[10px]! font-bold text-zinc-500 truncate uppercase tracking-tight">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 border-t border-zinc-900 space-y-2">
                            <div className="flex justify-between items-center bg-zinc-900/50 p-2.5 rounded-lg">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Access Level</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                                    {userRole}
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-zinc-900/50 p-2.5 rounded-lg">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Notification Sound</span>
                                <Switch
                                    checked={notificationSound}
                                    onCheckedChange={toggleNotificationSound}
                                    className="scale-75 origin-right"
                                />
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar