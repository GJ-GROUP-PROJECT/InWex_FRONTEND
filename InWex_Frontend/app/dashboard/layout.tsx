"use client"

import AppSidebar from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { role, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>
    if (!role) return null

    const currentRole = role.manager ? 'manager' : role.warehouse_staff ? 'staff' : 'guest'

    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                {/* SIDEBAR */}
                <AppSidebar role={currentRole} />

                <div className="flex flex-col w-full overflow-hidden">
                    {/* PAGE CONTENT */}
                    <main className="flex-1 px-20 pt-10 pb-4 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout
