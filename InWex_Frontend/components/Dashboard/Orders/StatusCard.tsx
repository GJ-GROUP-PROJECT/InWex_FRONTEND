import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type StatusCardProps = {
    title: string
    value: number | string
    percentage: number
    trend: "up" | "down"
}

export function StatusCard({
    title,
    value,
    percentage,
    trend,
}: StatusCardProps) {
    const isUp = trend === "up"

    return (
        <Card className="w-75 pl-3 rounded-2xl border-none bg-zinc-900/80 shadow-lg">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-400">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-semibold text-white">
                        {value}
                    </span>

                    <Badge
                        className={cn(
                            "flex items-center gap-1 rounded-full px-3 py-1 text-sm",
                            isUp
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                        )}
                    >
                        {isUp ? (
                            <ArrowUp className="h-4 w-4" />
                        ) : (
                            <ArrowDown className="h-4 w-4" />
                        )}
                        {percentage}%
                    </Badge>
                </div>

                <p className="text-sm text-zinc-500">
                    than last week
                </p>
            </CardContent>
        </Card>
    )
}
