import AppSidebar from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navbar from '@/components/Navbar'
import React from 'react'

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col min-h-screen w-full py-10 px-20">
                <div>
                    <div className="flex justify-between items-center">
                        <div id="navbar-left" />
                        <Navbar />
                    </div>
                </div>
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    )
}

export default dashboardLayout