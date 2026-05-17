import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { fraunces } from "@/lib/fonts"

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

            <div className="absolute inset-0 bg-black/65" />

            <div className="relative z-20 flex h-full items-center mt-1">
                <div className="max-w-7xl mx-auto px-8 md:px-12 pb-8 text-center">
                    <h1 className={`${fraunces.className} text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-5`}>
                        Manage stock, <br />
                        <em
                            className="italic font-light text-violet-400 "
                            style={{ textShadow: '0 0 80px rgba(157,133,255,0.6), 0 0 160px rgba(124,58,237,0.3)' } as React.CSSProperties}
                        >
                            effortlessly.
                        </em>
                    </h1>

                    <p className={`text-base text-zinc-400 font-light leading-relaxed max-w-152 mb-6`}>
                        Track product movement, forecast demand, and gain real-time insights — all in one powerful system built for modern businesses.
                    </p>

                    <Button
                        variant="outline"
                        className="border-violet-500/40 text-white hover:bg-violet-500/10 hover:border-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:shadow-[0_0_32px_rgba(124,58,237,0.45)] transition-all duration-300 px-6 py-4"
                        asChild
                    >
                        <Link href="/auth?signup=true">Get Started</Link>
                    </Button>

                </div>
            </div>
        </>
    )
}

export default Hero