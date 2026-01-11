import Navbar from "@/components/Dashboard/Navbar"



const Shipping = () => {
    const navbarLeftContent = (
        <h1 className="text-4xl font-medium">Shipping</h1>

    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />
        </>
    )
}

export default Shipping