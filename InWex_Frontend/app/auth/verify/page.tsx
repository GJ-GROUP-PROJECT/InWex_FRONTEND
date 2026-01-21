import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse" />
                        <div className="relative bg-white/5 p-8 rounded-full border border-white/10">
                            <Clock className="w-16 h-16 text-white/80" />
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <h1 className="text-7xl md:text-7xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        Verification
                    </h1>
                    <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                <p className="text-white/60 text-xl leading-relaxed max-w-lg mx-auto">
                    Your account is pending approval.
                    <br />
                    Please wait for verification from your organization.
                </p>

                <div className="pt-4">
                    <Button
                        variant="secondary"
                        className="backdrop-blur-sm transition-all duration-300 px-8 py-6 text-base"
                    >
                        <Link href="/">Return To Home</Link>
                    </Button>
                </div>

                <div className="flex justify-center gap-2 pt-4">
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        </div>
    )
}

export default Page