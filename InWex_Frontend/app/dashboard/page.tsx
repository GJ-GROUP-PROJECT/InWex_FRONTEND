"use client"

import { useEffect, useState } from "react"
import ManagerDashboard from "./(role)/(manager)/ManagerDashboard"
import StaffDashboard from "./(role)/(staff)/StaffDashboard"
import { useRouter } from "next/navigation"

type Roles = {
    admin: boolean
    business: boolean
    manager: boolean
    warehouse_staff: boolean
}

const DashboardPage = () => {
    const [role, setRole] = useState<Roles | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (typeof window === "undefined") {
            setIsLoading(false)
            return
        }

        const stored = localStorage.getItem("UserData")
        if (!stored) {
            router.replace("/login")
            return
        }

        try {
            const userData = JSON.parse(stored)
            setRole(userData.roles)
        } catch (error) {
            console.error("Error parsing user data:", error)
            router.replace("/login")
        } finally {
            setIsLoading(false)
        }
    }, [router])

    if (isLoading) return <div>Loading...</div>
    if (!role) return null

    if (role.manager) return <ManagerDashboard />
    if (role.warehouse_staff) return <StaffDashboard />

    return <div>No authorized role found</div>
}

export default DashboardPage
