"use client";

import { ChevronsUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        const topElement = document.getElementById('top');
        if (topElement) {
            topElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
            <button
                onClick={scrollToTop}
                className="mb-6 text-[11px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase flex flex-col items-center gap-1"
            >
                <ChevronsUp size={14} />
                Back to Top
            </button>

            <p className="text-xs text-zinc-500 tracking-wide">
                @2026 <span className="text-zinc-300">Inwex</span> All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer