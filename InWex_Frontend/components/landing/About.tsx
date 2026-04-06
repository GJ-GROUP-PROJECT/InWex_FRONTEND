import { Separator } from "@/components/ui/separator"

const About = () => {
    const stats = [
        { value: "99.9%", label: "Uptime Guarantee" },
        { value: "24/7", label: "Support Available" },
        { value: "500+", label: "Active Users" },
    ]

    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-24">
            <div className="mb-12 text-center">
                <h2 className="text-xl md:text-4xl font-bold tracking-tight">About Our System</h2>
                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed max-w-xl mx-auto">
                    Built with modern technologies and best practices to help businesses
                    of all sizes manage their inventory efficiently.
                </p>
            </div>

            <div className="grid gap-16 md:grid-cols-2 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-3">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Our Inventory Management System helps businesses gain complete visibility
                        over their stock, orders, and product performance in real time.
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        From small businesses to large-scale operations, we simplify inventory
                        tracking, reduce losses, and improve decision-making with actionable insights.
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Designed for scalability, our platform grows with your business and adapts
                        to your operational needs effortlessly.
                    </p>
                </div>

                {/* Right Stats */}
                <div className="flex flex-col">
                    {stats.map(({ value, label }) => (
                        <div key={label}>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-[10px] text-zinc-500 tracking-widest uppercase">
                                    {label}
                                </span>
                                <span className="text-xl font-bold tabular-nums text-white">
                                    {value}
                                </span>
                            </div>
                            <Separator className="bg-white/10" />
                        </div>
                    ))}
                    <div>
                        <div className="flex items-center justify-between py-4">
                            <span className="text-[10px] text-zinc-500 tracking-widest uppercase">
                                Products Tracked
                            </span>
                            <span className="text-xl font-bold tabular-nums text-white">
                                50K+
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About