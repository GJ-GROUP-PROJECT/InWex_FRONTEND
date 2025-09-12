import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", inbound: 2400, outbound: 2100 },
    { month: "Feb", inbound: 1398, outbound: 1890 },
    { month: "Mar", inbound: 3200, outbound: 2800 },
    { month: "Apr", inbound: 3908, outbound: 3100 },
    { month: "May", inbound: 4800, outbound: 4300 },
    { month: "Jun", inbound: 3800, outbound: 3600 },
];

export function InventoryChart() {
    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Inventory Flow</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="inbound" fill="#22c55e" name="Inbound" />
                        <Bar dataKey="outbound" fill="#3b82f6" name="Outbound" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
