import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const Features = () => {
    return (
        <div className="mx-auto max-w-6xl px-6 w-full py-24">
            {/* Section Header */}
            <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Powerful Features
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to manage, monitor, and optimize your warehouse
                    operations efficiently.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Role-Based Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Secure access control for Admins, Managers, and Staff with
                        fine-grained permissions.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Real-Time Inventory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Track stock levels instantly and avoid overstocking or shortages
                        with live updates.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Sitting Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Identify slow-moving products and optimize warehouse storage
                        efficiency.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Analyze category-wise performance and make data-driven decisions.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Visual insights with charts and reports to monitor warehouse KPIs
                        in one place.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Secure & Scalable</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Built with modern security standards and scalable architecture
                        for growing operations.
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Features