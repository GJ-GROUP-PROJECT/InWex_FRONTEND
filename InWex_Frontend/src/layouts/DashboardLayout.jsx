import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify"
import { WMSHeader } from "../components/WMSHeader";
import { WMSSidebar } from "../components/WMSSidebar";

const DashboardLayout = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <WMSHeader user={user} />

                <div className="flex flex-1">
                    <WMSSidebar />

                    <main className="flex-1 p-6 bg-white rounded-tl-2xl shadow-inner">
                        <Outlet />
                    </main>
                </div>

                <ToastContainer />
            </div>
        </>
    )
}

export default DashboardLayout