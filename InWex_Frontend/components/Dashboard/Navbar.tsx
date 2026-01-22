"use client"

import React from "react"
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
import { Separator } from "../ui/separator"

interface NavbarProps {
    leftContent?: React.ReactNode
    name: string
    email: string
    role: string
    avatar: string
}

const Navbar = ({ leftContent, name, email, role, avatar }: NavbarProps) => {
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
                            <AvatarImage src={avatar} />
                            <AvatarFallback>
                                {name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="p-0">
                        <Card className="w-72 border-none shadow-none">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback>
                                        {name?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="text-sm font-medium">{name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {email}
                                    </p>
                                </div>
                            </CardHeader>

                            <Separator />

                            <CardContent className="pt-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Role</span>
                                    <span className="font-medium">{role}</span>
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
