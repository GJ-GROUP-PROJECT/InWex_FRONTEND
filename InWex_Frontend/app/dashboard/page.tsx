"use client"

import { useAuth } from "@/contexts/AuthContext"
import ManagerDashboard from "./(role)/(manager)/ManagerDashboard"
import StaffDashboard from "./(role)/(staff)/StaffDashboard"

const DashboardPage = () => {
    const { role, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>
    if (!role) return null

    if (role.manager) return <ManagerDashboard />
    if (role.warehouse_staff) return <StaffDashboard />

    return <div>No authorized role found</div>
}

export default DashboardPage
