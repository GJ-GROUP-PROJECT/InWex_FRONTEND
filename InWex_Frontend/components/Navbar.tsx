import Link from "next/link"
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

const Navbar = () => {
    return (
        <header className="h-20 w-full">
            <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-semibold">
                    <Image src="/logo/Inwex.png" alt="InWex Logo" width={200} height={200} />
                </Link>

                {/* Navigation Links */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#features" className="px-4 py-2">Features</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#about" className="px-4 py-2">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#pricing" className="px-4 py-2">Pricing</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#contact" className="px-4 py-2">Contact</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button variant="ghost" asChild>
                                <Link href="/auth" className="px-4 py-2">Log in</Link>
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80">Sign up</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-48 gap-1">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/auth/org/signup" className="p-3">As Business</Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/auth?signup=true" className="p-3">As Employee</Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}

export default Navbar