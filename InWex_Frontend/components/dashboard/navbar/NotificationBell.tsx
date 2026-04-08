"use client"

import { Bell, CheckCheck } from "lucide-react"
import { useEffect, useState } from "react"
import ws from "@/lib/socket"
import { api } from "@/lib/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"


const NotificationBell = ({ sound }: { sound?: boolean }) => {
    const [notifications, setNotifications] = useState<{ id: number, title: string, message: string, created_at: string, is_read: boolean }[]>([])
    const unreadCount = notifications.filter((n) => !n.is_read).length

    useEffect(() => {
        api.get(`/network/notifications`)
            .then((res) => setNotifications(res.data.reverse()))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setNotifications((prev) => [data, ...prev])
            console.log(sound)
            if (sound) new Audio("/sound/notification_v2.mp3").play().catch(() => { })
        }
    }, [sound])

    const markAllRead = () => {
        api.get("/network/notifications?is_read=true")
            .then(() => setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true }))))
            .catch((err) => console.log(err))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative bg-zinc-900/50 hover:bg-zinc-900 border-none rounded-lg transition-all group outline-none"
                >
                    <Bell className="h-3 w-3 text-zinc-500 group-hover:text-white transition-colors" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-90 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden z-50"
            >
                <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-900 bg-zinc-900/40">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Notifications</p>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                        >
                            <CheckCheck className="h-2.5 w-2.5 text-emerald-500" />
                            Mark all read
                        </button>
                    )}
                </div>

                <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">No active alerts</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`flex items-start gap-2.5 px-4 py-3 border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors ${!n.is_read ? "bg-zinc-900/10" : "opacity-60"}`}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[10px] leading-relaxed ${!n.is_read ? "font-bold text-zinc-100" : "text-zinc-500"}`}>
                                        {n.message}
                                    </p>
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter mt-1">
                                        {new Date(n.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                    </p>
                                </div>
                                {!n.is_read && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse" />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationBell