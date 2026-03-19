const features = [
    {
        title: "Role-Based Access",
        description: "Secure access control for Admins, Managers, and Staff with fine-grained permissions.",
    },
    {
        title: "Real-Time Inventory",
        description: "Track stock levels instantly and avoid overstocking or shortages with live updates.",
    },
    {
        title: "Product Sitting Analysis",
        description: "Identify slow-moving products and optimize warehouse storage efficiency.",
    },
    {
        title: "Category Performance",
        description: "Analyze category-wise performance and make data-driven decisions.",
    },
    {
        title: "Analytics Dashboard",
        description: "Visual insights with charts and reports to monitor warehouse KPIs in one place.",
    },
    {
        title: "Secure & Scalable",
        description: "Built with modern security standards and scalable architecture for growing operations.",
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