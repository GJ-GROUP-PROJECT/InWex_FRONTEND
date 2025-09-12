const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')] bg-cover bg-center opacity-10"></div>

            {/* Transparent Overlay */}
            <div className="absolute inset-0 bg-background/50"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                {/* Heading with partial gradient */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Streamline Your{" "}
                    <span className="bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
                        Warehouse Operations
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    Boost efficiency by 40% with our intelligent warehouse management system.
                    Real-time tracking, automated processes, and seamless inventory control.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="h-12 px-8 text-lg font-medium inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition">
                        Start Free Trial
                    </button>
                    <button className="h-12 px-8 text-lg font-medium inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition">
                        Watch Demo
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-primary">500+</div>
                        <div className="text-muted-foreground">Active Warehouses</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary">99.9%</div>
                        <div className="text-muted-foreground">Uptime Guarantee</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary">40%</div>
                        <div className="text-muted-foreground">Efficiency Increase</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
