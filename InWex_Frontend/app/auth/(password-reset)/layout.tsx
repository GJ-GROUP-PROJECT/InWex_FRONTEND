import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Button size="sm" variant="ghost" className="group fixed top-6 left-6 z-50 h-8 px-5 text-xs text-zinc-400 hover:text-white" asChild>
                <Link href="/auth" className="flex items-center gap-1.5">
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                    Back to Login
                </Link>
            </Button>
            {children}
        </>
    )
}