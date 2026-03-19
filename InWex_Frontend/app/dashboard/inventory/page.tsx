"use client"

import InventoryContent from "@/components/dashboard/inventory/InventoryContent";
import Navbar from "@/components/dashboard/navbar/Navbar";

const page = () => {
    return (
        <>
            <Navbar />
            <InventoryContent />
        </>
    )
}

export default page