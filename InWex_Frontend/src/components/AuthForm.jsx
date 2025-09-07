import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AuthForm = ({ type = 'Login', fields = [], submitUrl = 'api/accounts/login', redirectTo = '/', background = '../assets/images/LoginPageImage.jpg', cssSpace='space-y-6'}) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: ''
        }), {})
    );

    const navigate = useNavigate()

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(submitUrl, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            });
            toast.success(`${type} Successful`);
            navigate(redirectTo);
        }
        catch (error) {
            if (error.response) {
                toast.error(`${type} Failed: ${error.response.data}`);
            } else if (error.request) {
                toast.error('No response from server');
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center bg-white">
                    <div className="w-full max-w-md">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-7">
                            {type === 'Login' ? 'Log in'
                                : type === 'Register as Employee' ?
                                    <> Register <span className='text-2xl font-bold text-gray-700'> as Employee </span> </> :
                                    <> Register <span className='text-2xl font-bold text-gray-700'> as Organisation </span> </>}</h1>
                        <form className={cssSpace} onSubmit={submitHandler}>
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={changeHandler}
                                        placeholder={field.placeholder}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 mt-5 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                            >
                                {type === 'Login' ? 'Log in' : 'Create Account'}
                            </button>

                            <p className="text-center text-gray-600 text-sm mt-4">
                                {type === 'Login' ? "Don't have an account? " : 'Already have an account? '}
                                <Link
                                    to={type === 'Login' ? '/register' : '/login'}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    {type === 'Login' ? 'Sign up' : 'Log in'}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 h-screen overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)] rounded-tl-2xl rounded-bl-2xl">
                    <img src={background} alt="Background" className="w-full h-full object-cover" />
                </div>
            </div>
        </>
    )
}

export default AuthForm