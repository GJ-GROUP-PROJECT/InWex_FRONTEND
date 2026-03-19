import { KPICardProps } from "@/lib/types/AnalysisTypes";

export default function KPICard({ title, value, subValue, icon }: KPICardProps) {
    return (
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/50 hover:border-zinc-800 transition-colors group">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600 group-hover:text-zinc-500 transition-colors">
                        {title}
                    </p>
                    <h3 className="text-xl font-black text-white tracking-tighter">
                        {value}
                    </h3>
                    <p className="text-[10px] font-bold text-zinc-500 italic">
                        {subValue}
                    </p>
                </div>
                <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-900 group-hover:bg-zinc-900 transition-colors">
                    {icon}
                </div>
            </div>
        </div>
    );
}