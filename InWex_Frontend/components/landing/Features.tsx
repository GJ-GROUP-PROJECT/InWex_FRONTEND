import { fraunces, poppins } from "@/lib/fonts"
import { Package, MapPin, BarChart2, ShoppingCart, Shield, Users } from "lucide-react"

const features = [
    {
        icon: Users,
        title: "Role-Based Access",
        description: "Control access across Admins, Managers, and Staff with secure and customizable permissions.",
    },
    {
        icon: Package,
        title: "Real-Time Tracking",
        description: "Monitor stock levels instantly across multiple locations and prevent stockouts or overstocking.",
    },
    {
        icon: MapPin,
        title: "Multi-Location",
        description: "Manage inventory across warehouses, stores, or branches from a single unified dashboard.",
    },
    {
        icon: BarChart2,
        title: "Analytics & Reporting",
        description: "Generate detailed reports and visual insights to track KPIs and make data-driven decisions.",
    },
    {
        icon: ShoppingCart,
        title: "Order Management",
        description: "Track incoming and outgoing stock with seamless order management workflows.",
    },
    {
        icon: Shield,
        title: "Secure & Scalable",
        description: "Built with modern architecture to ensure data security and seamless scalability.",
    },
]

const Features = () => {
    return (
        <div className="mx-auto max-w-5xl px-8 md:px-12 w-full py-28">

            <div className="mb-16">
                <p className={`${poppins.className} text-xs text-violet-400 uppercase tracking-widest font-medium mb-3`}>
                    Features
                </p>
                <h2 className={`${fraunces.className} text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-lg`}>
                    Everything you need, nothing you don&#39;t.
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:pl-20">
                {features.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/3 p-7 hover:bg-white/6 hover:border-violet-500/30 hover:scale-[1.03] transition-all duration-300 group cursor-default"
                    >
                        <Icon
                            size={18}
                            className="text-violet-400 group-hover:text-violet-300 transition-colors"
                        />
                        <div className="flex flex-col gap-1.5">
                            <h3 className={`${poppins.className} text-sm font-medium text-white`}>
                                {title}
                            </h3>
                            <p className={`${poppins.className} text-xs text-zinc-500 leading-relaxed`}>
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Features