import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Benefits from "../components/Benefits.jsx";

const HomePage = () => {
    return (
        <>
            <div className="min-h-screen">
                <Hero />
                <Features />
                <Benefits />
            </div>
        </>
    )
}

export default HomePage