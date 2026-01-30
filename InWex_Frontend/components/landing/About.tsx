import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const About = () => {
    return (
        <div className="mx-auto max-w-6xl px-6 w-full py-24">
            <div className="grid gap-12 md:grid-cols-2 items-center">
                {/* Left Content */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        About Our System
                    </h2>
                    <p className="text-muted-foreground text-lg mb-4">
                        Our Smart Warehouse Management System is designed to streamline
                        your inventory operations and provide real-time insights into
                        your warehouse performance.
                    </p>
                    <p className="text-muted-foreground text-lg mb-4">
                        Built with modern technologies and best practices, we help
                        businesses of all sizes manage their inventory efficiently,
                        reduce costs, and improve operational efficiency.
                    </p>
                    <p className="text-muted-foreground text-lg">
                        Whether you&39;re running a small warehouse or managing multiple
                        facilities, our system scales with your needs and provides the
                        tools you need to succeed.
                    </p>
                </div>

                {/* Right Content - Stats */}
                <div className="grid grid-cols-2 gap-6">
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">
                                99.9%
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Uptime Guarantee</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">
                                24/7
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Support Available</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">
                                500+
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Active Users</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">
                                50K+
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Products Tracked</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default About