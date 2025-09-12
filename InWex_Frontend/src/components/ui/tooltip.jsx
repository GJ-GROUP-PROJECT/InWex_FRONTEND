import { useState } from "react";

export function TooltipCard({ trigger, children, position = "right" }) {
    const [open, setOpen] = useState(false);

    // positioning classes
    const positionClasses = {
        right: "absolute right-0 mt-2",
        left: "absolute left-0 mt-2",
        top: "absolute bottom-full mb-2",
        bottom: "absolute top-full mt-2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* Trigger element */}
            {trigger}

            {/* Tooltip content */}
            {open && (
                <div
                    className={`${positionClasses[position]} w-56 rounded-lg bg-white shadow-lg border p-3 z-50 text-sm`}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
