import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from '../components/ui/badge';
import { Package, Truck, ShoppingCart, AlertTriangle, Import } from "lucide-react";

const activities = [
    {
        id: 1,
        type: "order",
        message: "New order #WO-2024-001 received",
        time: "2 minutes ago",
        status: "new",
        icon: ShoppingCart,
    },
    {
        id: 2,
        type: "shipment",
        message: "Shipment #SH-2024-045 departed",
        time: "15 minutes ago",
        status: "shipped",
        icon: Truck,
    },
    {
        id: 3,
        type: "inventory",
        message: "Low stock alert: SKU-ABC123",
        time: "1 hour ago",
        status: "warning",
        icon: AlertTriangle,
    },
    {
        id: 4,
        type: "receiving",
        message: "Received 500 units of SKU-XYZ789",
        time: "2 hours ago",
        status: "completed",
        icon: Package,
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "new":
            return "bg-info text-info-foreground";
        case "shipped":
            return "bg-primary text-primary-foreground";
        case "warning":
            return "bg-warning text-warning-foreground";
        case "completed":
            return "bg-success text-success-foreground";
        default:
            return "bg-muted text-muted-foreground";
    }
};

export function RecentActivity() {
    return (
        <Card className="shadow-medium">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="bg-muted p-2 rounded-lg">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">
                                        {activity.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                                <Badge className={getStatusColor(activity.status)}>
                                    {activity.status}
                                </Badge>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
