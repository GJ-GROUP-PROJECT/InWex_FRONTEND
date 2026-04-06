import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

const Hero = () => {
    return (
        <>
            <Image
                src="/landingPage.jpg"
                alt="Landing Page Background"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-20 flex h-full items-center">
                <div className="mx-auto max-w-4xl px-6 pb-6 text-white">
                    <h1 className="text-xl md:text-6xl font-bold leading-tight">
                        <span className="text-2xl md:text-7xl">Inventory</span> <br />
                        Management System
                    </h1>

                    <p className="mt-2.5 max-w-xl text-xs text-zinc-400 leading-relaxed">
                        Manage stock, track product movement, forecast demand, and gain real-time
                        insights — all in one powerful inventory management system built for modern businesses.
                    </p>

                    <div className="mt-4">
                        <Button className="h-8 px-5.5 text-[11px]">
                            <Link href="/auth?signup=true">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero