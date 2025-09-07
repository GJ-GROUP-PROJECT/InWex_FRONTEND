import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import background from '../assets/images/LoginPageImage.jpg'

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(loginData);

        try {
            const res = await axios.post(
                '/api/accounts/login',
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )

            console.log('Login Successful', res.data)
            return navigate('/')
        }
        catch (error) {
            if (error.response) {
                console.error("Login Failed:", error.response.data)
            }
            else if (error.request) {
                console.error("No response:", error.request)
            } else {
                console.error("Error:", error.message)
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Login Form */}
            <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center bg-white">
                {/* Form container */}
                <div className="w-full max-w-md">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-7">Log in</h1>
                    {/* Form */}
                    <form
                        className="space-y-6"
                        onSubmit={submitHandler}
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={changeHandler}
                                placeholder="test@example.com"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={changeHandler}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                            />
                        </div>
                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                                Forgot Password?
                            </Link>
                        </div>
                        {/* Sign In */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                        >
                            Log in
                        </button>
                        {/* Sign Up */}
                        <p className="text-center text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 h-screen overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)]">
                <img
                    src={background}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default LoginPage
