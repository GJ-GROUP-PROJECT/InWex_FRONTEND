import { Separator } from "@/components/ui/separator"
import { fraunces, poppins } from "@/lib/fonts"

const stats = [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Support Available" },
    { value: "500+", label: "Active Users" },
    { value: "50K+", label: "Products Tracked" },
]

const About = () => {
    return (
        <div className="mx-auto max-w-5xl px-8 md:px-12 w-full py-28">

            {/* Header */}
            <div className="mb-16">
                <p className={`text-xs text-violet-400 uppercase tracking-widest font-medium mb-3`}>
                    About
                </p>
                <h2 className={`${fraunces.className} text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-lg`}>
                    Built for businesses that mean business.
                </h2>
            </div>

            <div className="grid gap-16 md:grid-cols-2 items-start">

                {/* Left */}
                <div className={`${poppins.className} flex flex-col gap-5`}>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Our system gives businesses complete visibility over their stock,
                        orders, and product performance — all in real time.
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        From small shops to large-scale operations, we simplify inventory
                        tracking, reduce losses, and sharpen decision-making with
                        actionable insights.
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Designed for scalability, the platform grows with your business
                        and adapts to your operational needs — effortlessly.
                    </p>
                </div>

                {/* Right stats */}
                <div className="flex flex-col">
                    {stats.map(({ value, label }, i) => (
                        <div key={label}>
                            <div className="flex items-center justify-between py-5">
                                <span className={`${poppins.className} text-[11px] text-zinc-500 tracking-widest uppercase`}>
                                    {label}
                                </span>
                                <span
                                    className={`${fraunces.className} text-3xl font-bold tabular-nums text-white`}
                                    style={{
                                        textShadow: i === 0
                                            ? '0 0 40px rgba(157,133,255,0.4)'
                                            : 'none'
                                    }}
                                >
                                    {value}
                                </span>
                            </div>
                            {i < stats.length - 1 && (
                                <Separator className="bg-white/8" />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default About