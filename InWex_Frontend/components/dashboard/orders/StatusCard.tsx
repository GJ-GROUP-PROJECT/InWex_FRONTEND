import { statusStyles } from "@/components/config/statusStyles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OrderStatus = "Requested" | "In_Progress" | "Delivered" | "Returned"

type StatusCardProps = {
    title: string
    value: number | string
    status: OrderStatus
}

export function StatusCard({
    title,
    value,
    status,
}: StatusCardProps) {

    const style = statusStyles[status]
    const Icon = style.icon

    return (
        <Card className="w-75 pl-3 rounded-2xl border-none bg-zinc-900/80 shadow-lg">
            <CardHeader>
                <CardTitle className={`text-sm font-medium flex items-center gap-2 text-zinc-400 ${style.text}`}>
                    <Icon className="h-4 w-4" />
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-semibold text-white">
                        {value}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
