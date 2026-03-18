import { Card, CardContent, CardFooter } from "@/components/ui/card"

export const ProductCardShimmer = () => {
    return (
        <Card className="w-full rounded-2xl overflow-hidden bg-[#121212] p-0 border border-zinc-800/50 animate-pulse flex flex-col">
            <div className="h-60 bg-zinc-900/50" />

            <CardContent className="flex-1 px-5 pt-5 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-zinc-800/50 rounded-lg" />
                    <div className="h-7 w-20 bg-zinc-800/50 rounded-lg" />
                </div>

                <div className="space-y-2">
                    <div className="h-7 w-3/4 bg-zinc-800/50 rounded-lg" />
                    <div className="space-y-1.5">
                        <div className="h-4 w-full bg-zinc-800/50 rounded-md" />
                        <div className="h-4 w-2/3 bg-zinc-800/50 rounded-md" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="px-5 pb-6 pt-2">
                <div className="h-11 w-full bg-zinc-800/50 rounded-xl" />
            </CardFooter>
        </Card>
    )
}