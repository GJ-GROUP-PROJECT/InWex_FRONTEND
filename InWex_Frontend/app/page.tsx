"use client";

import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div id="top" className="relative h-screen w-full overflow-hidden">
                <Image
                    src="/landingPage.jpg"
                    alt="Landing Page Background"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative z-20">
                    <Navbar />
                </div>

                <Hero />
            </div>

            <section id="about" className="relative min-h-screen flex items-center">
                <About />
            </section>

            {/* Features Section */}
            <section id="features" className="relative min-h-screen flex items-center">
                <Features />
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative min-h-screen flex items-center">
                <Contact />
            </section>
        </>
    );
}