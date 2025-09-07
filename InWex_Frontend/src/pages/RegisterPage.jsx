import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target

        setRegisterForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(registerForm);

        // try {
        //     const res = await fetch('/api/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(registerForm),
        //     })

        //     const data = await res.json()

        //     if (res.ok) {
        //         console.log("Registration Success: ", data)
        //         return navigate('/login')
        //     }
        //     else {
        //         console.log("Registration Failed: ", data.message)
        //     }
        // }
        // catch (error) {
        //     console.log("Error: ", error)
        // }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center bg-white">
                    {/* Form container */}
                    <div className="w-full max-w-md">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-7">Register</h1>
                        {/* Form */}
                        <form
                            className="space-y-3"
                            onSubmit={submitHandler}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="fullname"
                                    name="fullname"
                                    value={registerForm.fullname}
                                    onChange={changeHandler}
                                    placeholder="Test Example"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerForm.email}
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
                                    value={registerForm.password}
                                    onChange={changeHandler}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 mb-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                                />
                            </div>
                            {/* Register*/}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                            >
                                Create Account
                            </button>
                            {/* Log in */}
                            <p className="text-center text-gray-600 text-sm">
                                Already have an account?{' '}
                                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 h-screen overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)]">

                </div>
            </div>
        </>
    )
}

export default RegisterPage