import AppSidebar from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                {/* SIDEBAR */}
                <AppSidebar />

                <div className="flex flex-col w-full overflow-hidden">
                    {/* TOP NAVBAR */}
                    <div className="px-20 pt-10 py-4">
                        <div className="flex justify-between items-center">
                            <div id="navbar-left" />
                            <Navbar />
                        </div>
                    </div>

                    {/* PAGE CONTENT */}
                    <main className="flex-1 px-20 pb-10 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default dashboardLayout
