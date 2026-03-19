import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type SidePanelProps = {
    isSignup: boolean
}

const SidePanel = ({ isSignup }: SidePanelProps) => {
    return (
        <div
            className={`
                absolute top-0 left-0 h-full w-1/2 z-30
                transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)
                ${isSignup ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <div className="relative h-full w-full overflow-hidden shadow-2xl">
                <Image
                    src="/sidePanel.jpg"
                    alt="Side Panel Image"
                    fill
                    sizes="50vw"
                    className="object-cover object-bottom"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />

                <div
                    className={`
                        absolute top-8 z-20 transition-all duration-700 ease-in-out
                        ${isSignup
                            ? "left-full -translate-x-[calc(100%+32px)]"
                            : "left-8 translate-x-0"
                        }
                    `}
                >
                    <Button
                        variant="outline"
                        className="h-8 px-4 text-[11px] bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md group"
                        asChild
                    >
                        <Link href="/" className="flex items-center gap-1.5">
                            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                            <span>Back To Home</span>
                        </Link>
                    </Button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-10 text-white p-12">
                    <div className="text-center transition-all duration-500 delay-200 overflow-hidden">
                        <h2 className="text-2xl font-bold tracking-tight mb-2">
                            {isSignup ? "Create Account" : "Welcome Back"}
                        </h2>
                        <div className="h-px w-8 bg-primary mx-auto mb-3" />
                        <p className="text-xs text-white/60">
                            {isSignup
                                ? "Start managing your inventory today."
                                : "Access your warehouse dashboard."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePanel