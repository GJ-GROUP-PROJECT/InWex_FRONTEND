import { Button } from "@/components/ui/button"

const SidePanel = ({ isSignup, toggle }: any) => {
    return (
        <div
            className={`
                absolute top-0 left-0 h-full w-1/2 bg-muted
                transition-transform duration-700 ease-in-out
                ${isSignup ? "translate-x-full" : "translate-x-0"}
            `}
        >
            <div className="flex flex-col h-full items-center justify-center text-center px-10">
                <h2 className="text-3xl font-bold">
                    {isSignup ? "Welcome Back!" : "Hello, Friend!"}
                </h2>

                <p className="mt-4 text-muted-foreground">
                    {isSignup
                        ? "Already have an account?"
                        : "Enter your details and start your journey"}
                </p>

                <Button variant="outline" className="mt-6" onClick={toggle}>
                    {isSignup ? "Login" : "Sign Up"}
                </Button>
            </div>
        </div>
    )
}

export default SidePanel
