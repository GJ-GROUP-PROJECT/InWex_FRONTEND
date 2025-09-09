import { Link } from 'react-router-dom'

const FormContent = ({
    type,
    title,
    fields,
    register,
    handleSubmit,
    onSubmit,
    errors,
    cssSpace
}) => {
    return (
        <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center bg-white">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-7">
                    {type === 'Login' ? 'Log in' : title}
                </h1>

                <form className={cssSpace} onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                                {
                                ...register(field.name, field.rules)
                                }
                            />
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[field.name].message}
                                </p>
                            )}
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
    );
};

export default FormContent;