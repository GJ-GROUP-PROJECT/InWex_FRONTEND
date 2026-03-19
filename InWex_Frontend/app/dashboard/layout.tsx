"use client"

import AppSidebar from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { role, isLoading } = useAuth()

    if (isLoading) return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="w-5 h-5 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
        </div>
    )
    if (!role) return null

    const currentRole = role.business ? 'business' : role.manager ? 'manager' : 'staff'

    return (
        <SidebarProvider style={{ "--sidebar-width": "230px" } as React.CSSProperties}>
            <div className="flex h-screen w-screen overflow-hidden">
                <AppSidebar role={currentRole} />

                <div className="flex flex-col w-full overflow-hidden">
                    <main className="flex-1 px-10 pt-6 pb-4 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout