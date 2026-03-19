import { statusStyles } from "@/components/config/statusStyles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OrderStatus = "Requested" | "In_Progress" | "Delivered" | "Returned"

type StatusCardProps = {
    title: string
    value: number | string
    status: OrderStatus
}

export function StatusCard({ title, value, status }: StatusCardProps) {
    const style = statusStyles[status]
    const Icon = style.icon

    return (
        <Card className="w-full pl-2 rounded-xl border-none bg-zinc-900/80 shadow-lg">
            <CardHeader className="pb-1 pt-4">
                <CardTitle className={`text-sm font-medium flex items-center gap-1.5 text-zinc-400 ${style.text}`}>
                    <Icon className="h-3 w-3" />
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pb-4">
                <span className="text-2xl font-semibold text-white">
                    {value}
                </span>
            </CardContent>
        </Card>
    )
}