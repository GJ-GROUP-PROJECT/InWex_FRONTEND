import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Plus, FileDown, Scan, RefreshCw } from "lucide-react";

export function QuickActions() {
    return (
        <Card className="shadow-medium">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg px-4 py-2 font-medium shadow hover:opacity-90 transition-opacity">
                        <Plus className="mr-2 h-4 w-4" />
                        New Order
                    </button>

                    <button className="flex items-center justify-center border rounded-lg px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors">
                        <Scan className="mr-2 h-4 w-4" />
                        Scan Item
                    </button>

                    <button className="flex items-center justify-center border rounded-lg px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors">
                        <FileDown className="mr-2 h-4 w-4" />
                        Export Data
                    </button>

                    <button className="flex items-center justify-center border rounded-lg px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
