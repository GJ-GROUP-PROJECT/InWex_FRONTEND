import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import background from '../assets/images/RegisterPageImage.jpeg'

const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState({
        fullname: '',
        email: '',
        contact: '',
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
        toast.success('Registered Successful')
        console.log(registerForm);

        // try {
        //     const res = await axios.post(
        //         '/api/accounts/register',
        //         registerForm,
        //         {
        //             headers: {
        //                 'Content-Type' : 'application/json',
        //                 'Accept' : 'application/json',
        //             }
        //         }
        //     )

        //     console.log('Registration Successful', res.data)
        //     toast.success('Registered Successful')
        //     return navigate('/login')
        // }
        // catch (error) {
        //     if (error.response) {
        //         console.error("Registration Failed:", error.response.data)
        //     }
        //     else if (error.request) {
        //         console.error("No response:", error.request)
        //     } else {
        //         console.error("Error:", error.message)
        //     }
        // }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - SignUp Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center bg-white">
                    {/* Form container */}
                    <div className="w-full max-w-md">
                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 mt-7">Register <span className='text-2xl font-bold text-gray-700'>as Employee</span></h1>
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
                                    type="text"
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
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                                />
                            </div>
                            {/* Contact */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Contact
                                </label>
                                <input
                                    type="tel"
                                    name="contact"
                                    pattern="[0-9]{10}"
                                    value={registerForm.contact}
                                    onChange={changeHandler}
                                    placeholder="+91 12345-67890"
                                    className="w-full px-4 py-3 mb-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
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
                <div className="w-full md:w-1/2 h-screen overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)] rounded-tl-2xl rounded-bl-2xl">
                    <img
                        src={background}
                        alt="Background"
                        className="w-full h-full object-cover scale-x-[-1]"
                    />
                </div>
            </div>
        </>
    )
}

export default RegisterPage