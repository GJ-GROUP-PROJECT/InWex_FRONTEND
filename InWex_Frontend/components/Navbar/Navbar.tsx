"use client"

import { Bell, MessageSquareMore } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"

const Navbar = () => {
    return (
        <div className="flex items-center space-x-3">
            <Button variant="secondary" size="icon-lg" className="cursor-pointer">
                <MessageSquareMore className="h-4.5! w-4.5!" />
            </Button>
            <Button variant="secondary" size="icon-lg" className="cursor-pointer">
                <Bell className="h-4.5! w-4.5!" />
            </Button>
            <Image
                src="/globe.svg"
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full object-cover cursor-pointer"
            />
        </div>
    )
}

export default Navbar