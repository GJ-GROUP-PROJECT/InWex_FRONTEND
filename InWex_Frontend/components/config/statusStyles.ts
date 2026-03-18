import { Clock, Truck, CheckCircle, AlertTriangle } from "lucide-react"

export const statusStyles = {
    Requested: {
        icon: Clock,
        text: "text-blue-400"
    },
    In_Progress: {
        icon: Truck,
        text: "text-yellow-400"
    },
    Delivered: {
        icon: CheckCircle,
        text: "text-green-400"
    },
    Returned: {
        icon: AlertTriangle,
        text: "text-red-400"
    }
}