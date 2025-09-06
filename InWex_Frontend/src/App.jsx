import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/RegisterPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<SignupPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/faq' element={<FAQPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default App