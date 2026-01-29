"use client"

import React, { useEffect, useState } from "react"
import { Bell, MessageSquareMore } from "lucide-react"

import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    Card,
    CardHeader,
    CardContent,
} from "../ui/card"

interface NavbarProps {
    leftContent?: React.ReactNode
}

const Navbar = ({ leftContent }: NavbarProps) => {
    const [userData, setUserData] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("UserData")
            if (stored) {
                return JSON.parse(stored)
            }
        }
        return { fullname: "", avatar: "", roles: {} }
    })

    const [userRole] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("UserData")
            if (stored) {
                const data = JSON.parse(stored)
                return Object.entries(data.roles || {}).find(([_, value]) => value)?.[0]?.replace(/_/g, " ") || "Unknown"
            }
        }
        return "Unknown"
    })

    return (
        <div className="flex items-center justify-between w-full px-4">
            <div className="flex-1">{leftContent}</div>

            <div className="flex items-center gap-3">
                <Button variant="secondary" size="icon">
                    <MessageSquareMore className="h-4 w-4" />
                </Button>

                <Button variant="secondary" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-9 w-9 cursor-pointer">
                            <AvatarImage src={userData.avatar} />
                            <AvatarFallback>
                                {userData.fullname?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="p-0">
                        <Card className="w-72 border-none shadow-none">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={userData.avatar} />
                                    <AvatarFallback>
                                        {userData.fullname?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="text-sm font-medium">{userData.fullname}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {userData.email}
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent className="text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Role</span>
                                    <span className="font-medium">{userRole}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar
