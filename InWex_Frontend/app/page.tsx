"use client";

import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />

            <section id="home" className="relative h-screen w-full overflow-hidden scroll-mt-24">
                <Hero />
            </section>

            <section id="about" className="relative min-h-screen flex items-center">
                <About />
            </section>

            <section id="features" className="relative min-h-screen flex items-center">
                <Features />
            </section>

            <section id="contact" className="relative min-h-screen flex items-center">
                <Contact />
            </section>
            <footer className="w-full text-gray border-t-2">
                <Footer />
            </footer>
        </>
    );
}