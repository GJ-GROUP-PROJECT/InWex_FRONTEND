import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

type SidePanelProps = {
    isSignup: boolean
}

const SidePanel = ({ isSignup }: SidePanelProps) => {
    return (
        <div
            className={`
                absolute top-0 left-0 h-full w-1/2 bg-muted
                transition-transform duration-700 ease-in-out
                ${isSignup ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <Image
                src="/sidePanel.jpg"
                alt="Side Panel Image"
                fill
                sizes="50vw"
                quality={100}
                className="object-cover object-bottom"
                priority
            />

            <div className="absolute inset-0 bg-black/40 z-10" />

            <Button
                className={`
                    absolute top-10 z-20 
                    transition-all duration-300 ease-in-out
                    ${isSignup ? "right-12" : "left-12"}
                `}
                variant="default"
                asChild
            >
                <Link href="/">Back To Home</Link>
            </Button>
        </div>
    )
}

export default SidePanel