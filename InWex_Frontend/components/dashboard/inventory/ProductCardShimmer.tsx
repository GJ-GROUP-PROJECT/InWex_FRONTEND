import { Card, CardContent, CardFooter } from "@/components/ui/card"

export const ProductCardShimmer = () => {
    return (
        <Card className="w-full rounded-xl overflow-hidden bg-[#121212] p-0 border border-zinc-800/50 animate-pulse flex flex-col">
            <div className="h-40 bg-zinc-900/50" />

            <CardContent className="flex-1 px-4 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="h-4 w-16 bg-zinc-800/50 rounded-md" />
                    <div className="h-4 w-14 bg-zinc-800/50 rounded-md" />
                </div>

                <div className="space-y-1">
                    <div className="h-4 w-3/4 bg-zinc-800/50 rounded-md" />
                    <div className="space-y-1">
                        <div className="h-3 w-full bg-zinc-800/50 rounded-md" />
                        <div className="h-3 w-2/3 bg-zinc-800/50 rounded-md" />
                    </div>
                </div>

                <div className="flex items-center gap-1.5 pt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-800/50" />
                    <div className="h-3 w-20 bg-zinc-800/50 rounded-md" />
                </div>
            </CardContent>

            <CardFooter className="px-4 pb-4 pt-2">
                <div className="h-8 w-full bg-zinc-800/50 rounded-lg" />
            </CardFooter>
        </Card>
    )
}