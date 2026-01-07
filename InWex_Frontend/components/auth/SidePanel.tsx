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
            {/* <Image
                src="/globe.svg"
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full object-cover cursor-pointer"
            /> */}
        </div>
    )
}

export default SidePanel
