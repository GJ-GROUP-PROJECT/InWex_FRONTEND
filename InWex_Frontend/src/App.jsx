import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/RegisterPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import InventoryPage from './pages/DashBoardPage/InventoryPage.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<MainLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<SignupPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/faq' element={<FAQPage />} />
                </Route>
                <Route path='/dashboard' element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path='inventory' element={<InventoryPage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </>
        )
    )

    return <RouterProvider router={router} />
}

export default App