import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";

export function MetricCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    className,
}) {
    const getChangeColor = () => {
        switch (changeType) {
            case "positive":
                return "text-success";
            case "negative":
                return "text-destructive";
            default:
                return "text-muted-foreground";
        }
    };

    return (
        <Card
            className={`shadow-medium hover:shadow-large transition-shadow ${className || ""}`}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                {change && (
                    <p className={`text-xs ${getChangeColor()}`}>
                        {change}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
