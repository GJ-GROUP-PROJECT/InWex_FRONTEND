"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { fraunces } from "@/lib/fonts"

const navItems = [
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
]

const Navbar = () => {
    const router = useRouter()
    const { user, logout } = useAuth()
    const isLoggedIn = !!user

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    const handleDashboard = () => {
        router.push("/dashboard")
    }

    return (
        <header className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-md">
            <div className="relative h-20 w-full max-w-7xl mx-auto px-8 flex items-center">

                {/* Logo */}
                <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer z-10 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                    onClick={() => scrollTo("home")}
                >
                    <Image src="/logo/InwexUpdatedTransparent.png" alt="InWex Logo" width={52} height={52} />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                    {navItems.map(({ label, id }) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className="text-xs text-zinc-500 hover:text-white transition-all duration-300 tracking-wide group"
                        >
                            <span className="group-hover:[text-shadow:0_0_8px_rgba(167,139,250,1),0_0_20px_rgba(167,139,250,0.9),0_0_40px_rgba(124,58,237,0.7)]">
                                {label}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Right side */}
                <div className="ml-auto hidden md:flex items-center gap-3">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/auth"
                                className="text-xs text-zinc-500 hover:text-white transition-all duration-300 px-2.5 group"
                            >
                                <span className="group-hover:[text-shadow:0_0_8px_rgba(167,139,250,1),0_0_20px_rgba(167,139,250,0.9),0_0_40px_rgba(124,58,237,0.7)]">
                                    Log in
                                </span>
                            </Link>

                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="nav-trigger h-7 px-3 text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-100 rounded-md shadow-[0_0_16px_rgba(255,255,255,0.15)] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all duration-300">
                                            Sign up
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-zinc-950 border border-violet-500/20 shadow-[0_0_24px_rgba(124,58,237,0.25)]">
                                            <ul className="w-48 p-1.5 space-y-0.5 bg-zinc-950">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href="/auth/org/signup"
                                                            className="block px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors"
                                                        >
                                                            As Business
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href="/auth?signup=true"
                                                            className="block px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors"
                                                        >
                                                            As Employee
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </>
                    ) : (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] transition-all duration-300">
                                    <AvatarImage src={user.avatar} className="object-cover" />
                                    <AvatarFallback className="bg-zinc-900 text-zinc-400 font-black text-xs">
                                        {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                sideOffset={12}
                                className="w-72 p-0 bg-zinc-950 border border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden"
                            >
                                <div className="p-4 bg-zinc-900/40">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-zinc-800 text-zinc-500 font-black text-xs">
                                                {user.fullname?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{user.fullname}</p>
                                            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 border-t border-zinc-800/60">
                                    <Button
                                        variant="ghost"
                                        onClick={handleDashboard}
                                        className="w-full justify-start text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg"
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={logout}
                                        className="w-full justify-start text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                                    >
                                        Log Out
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="flex md:hidden items-center gap-3 ml-auto">
                    {isLoggedIn && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-zinc-900 text-zinc-400 font-black text-[10px]">
                                {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/5">
                                <Menu size={18} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 bg-zinc-950 border-l border-zinc-800/60 text-white flex flex-col pt-10">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                            {!isLoggedIn ? (
                                <div className="flex flex-col h-full">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
                                            Navigation
                                        </span>
                                        {navItems.map(({ label, id }) => (
                                            <button
                                                key={id}
                                                className="text-left text-xs text-zinc-400 hover:text-white transition-colors px-3 py-2"
                                                onClick={() => scrollTo(id)}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-auto pb-8 flex flex-col gap-3">
                                        <Separator className="bg-zinc-800/60" />
                                        <Link href="/auth" className="text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1">
                                            Log in
                                        </Link>
                                        <Link href="/auth/org/signup" className="text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1">
                                            Sign up as Business
                                        </Link>
                                        <Link href="/auth?signup=true" className="text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1">
                                            Sign up as Employee
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="px-3 pb-5">
                                        <p className={`${fraunces.className} text-sm font-semibold text-white truncate`}>{user.fullname}</p>
                                        <p className="text-xs text-zinc-500 truncate mt-0.5">{user.email}</p>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <span className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
                                            Navigation
                                        </span>
                                        {navItems.map(({ label, id }) => (
                                            <button
                                                key={id}
                                                className="text-left text-xs text-zinc-400 hover:text-white transition-colors px-3 py-2"
                                                onClick={() => scrollTo(id)}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-auto pb-8 flex flex-col gap-3">
                                        <Separator className="bg-zinc-800/60" />
                                        <Button
                                            variant="ghost"
                                            className="justify-start text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                                            onClick={handleDashboard}
                                        >
                                            Dashboard
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            onClick={logout}
                                        >
                                            Log Out
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Navbar