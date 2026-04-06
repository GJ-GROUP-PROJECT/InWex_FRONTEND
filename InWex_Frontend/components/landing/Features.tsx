const features = [
    {
        title: "Role-Based Access",
        description: "Control access across Admins, Managers, and Staff with secure and customizable permissions.",
    },
    {
        title: "Real-Time Inventory Tracking",
        description: "Monitor stock levels instantly across multiple locations and prevent stockouts or overstocking.",
    },
    {
        title: "Multi-Location Management",
        description: "Manage inventory across warehouses, stores, or branches from a single unified dashboard.",
    },
    {
        title: "Analytics & Reporting",
        description: "Generate detailed reports and visual insights to track KPIs and make data-driven decisions.",
    },
    {
        title: "Order & Stock Management",
        description: "Track incoming and outgoing stock with seamless order management workflows.",
    },
    {
        title: "Secure & Scalable",
        description: "Built with modern architecture to ensure data security and seamless scalability.",
    },
]

const Features = () => {
    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-24">
            <div className="mb-12 text-center">
                <h2 className="text-xl md:text-4xl font-bold">Powerful Features</h2>
                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed max-w-lg mx-auto">
                    Everything you need to manage, monitor, and optimize your warehouse
                    operations efficiently.
                </p>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
                {features.map(({ title, description }) => (
                    <div
                        key={title}
                        className="flex flex-col gap-2 bg-background p-6 hover:bg-white/5 transition-colors duration-300"
                    >
                        <h3 className="text-xs font-semibold text-white">{title}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features