const Features = () => {
    const features = [
        {
            title: "Real-Time Inventory Tracking",
            description:
                "Monitor stock levels, locations, and movements in real-time with advanced RFID and barcode integration.",
            icon: "📦",
        },
        {
            title: "Automated Workflows",
            description:
                "Streamline picking, packing, and shipping processes with intelligent automation and route optimization.",
            icon: "🤖",
        },
        {
            title: "Advanced Analytics",
            description:
                "Gain insights into warehouse performance with comprehensive reporting and predictive analytics.",
            icon: "📊",
        },
        {
            title: "Multi-Location Support",
            description:
                "Manage multiple warehouses and distribution centers from a single, unified dashboard.",
            icon: "🏢",
        },
        {
            title: "Integration Ready",
            description:
                "Seamlessly connect with your existing ERP, CRM, and e-commerce platforms.",
            icon: "🔗",
        },
        {
            title: "Mobile Accessibility",
            description:
                "Access your warehouse data anywhere with our responsive web app and mobile applications.",
            icon: "📱",
        },
    ];

    return (
        <section className="py-20 px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Powerful Features for Modern Warehouses
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Everything you need to optimize your warehouse operations and stay ahead of the competition.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
                        >
                            <div className="p-8 text-center flex flex-col items-center">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-base text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
