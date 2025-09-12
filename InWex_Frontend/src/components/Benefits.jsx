const Benefits = () => {
    const benefits = [
        {
            title: "Reduce Operating Costs",
            stat: "30%",
            description: "Lower labor costs and minimize errors with automated processes and intelligent routing."
        },
        {
            title: "Faster Order Fulfillment",
            stat: "50%",
            description: "Process orders faster with optimized picking routes and real-time inventory visibility."
        },
        {
            title: "Improved Accuracy",
            stat: "99.8%",
            description: "Achieve near-perfect order accuracy with barcode scanning and validation systems."
        },
        {
            title: "Better Space Utilization",
            stat: "25%",
            description: "Maximize warehouse space efficiency with intelligent slotting and layout optimization."
        }
    ];

    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Measurable Results for Your Business
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Our clients see immediate improvements in efficiency, accuracy, and profitability.
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group rounded-xl border border-primary/20 bg-card text-card-foreground shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="p-6 text-center">
                                <p className="text-4xl font-extrabold text-primary mb-2">
                                    {benefit.stat}
                                </p>
                                <h3 className="text-lg font-semibold text-foreground mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 rounded-2xl p-10 text-center text-white bg-gradient-to-r from-blue-900 via-blue-700 to-orange-500 shadow-lg">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to Transform Your Warehouse?
                    </h3>
                    <p className="text-lg mb-6 opacity-90">
                        Join hundreds of companies already optimizing their operations with our WMS.
                    </p>
                    <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition">
                        Get Started Today
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
