import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"

const MainLayout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/register', '/forgot-password'];

    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname); 

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <Outlet />
        </>
    )
}

export default MainLayout