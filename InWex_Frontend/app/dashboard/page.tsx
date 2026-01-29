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
    const router = useRouter()

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("UserData") || "{}")
        if (!userData.roles) {
            router.replace("/login")
            return
        }
        setRole(userData.roles)
    }, [router])

    if (!role) return <div>Loading...</div>
    if (role.manager) return <ManagerDashboard />
    if (role.warehouse_staff) return <StaffDashboard />

}

export default DashboardPage
