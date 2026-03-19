import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="max-w-sm w-full text-center space-y-8">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse" />
                        <div className="relative bg-white/5 p-5 rounded-full border border-white/10">
                            <Clock className="w-8 h-8 text-white/80" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-2xl font-bold tracking-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                        Verification
                    </h1>
                    <div className="h-px w-16 mx-auto bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </div>

                <p className="text-white/60 text-xs leading-relaxed max-w-xs mx-auto">
                    Your account is pending approval.
                    <br />
                    Please wait for verification from your organization.
                </p>

                <div className="pt-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 px-6 text-xs backdrop-blur-sm transition-all duration-300"
                        asChild
                    >
                        <Link href="/">Return To Home</Link>
                    </Button>
                </div>

                <div className="flex justify-center gap-1.5 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        </div>
    )
}

export default Page