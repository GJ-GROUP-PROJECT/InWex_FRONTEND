import { useState } from 'react';
import background from '../assets/images/RegisterPageImage.jpeg'
import AuthForm from '../components/AuthForm.jsx';

const RegisterPage = () => {
    const [regType, setRegType] = useState('Employee')

    const empFields = [
        {
            name: 'fullname',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Test Example',
            rules: {
                required: 'Fullname is required',
                minLength: 8,
            }
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'test@example.com',
            rules: {
                required: 'Email is required',
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Enter valid email address'
                }
            }
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: '••••••••',
            rules: {
                required: 'Password is required',
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                },
            }
        },
        {
            name: 'contact_number',
            label: 'Contact',
            type: 'tel',
            placeholder: '1234567890',
            rules: {
                required: 'Contact number is required',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Contact must be 10 digits',
                }
            }
        },
    ]

    const orgFields = [
        {
            name: 'orgName',
            label: 'Org Name',
            type: 'text',
            placeholder: 'Test Example',
            rules: {
                required: 'Organization name is required',
                minLength: {
                    value: 3,
                    message: 'Organization name must be at least 3 characters long',
                },
            }
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'test@example.com',
            rules: {
                required: 'Email is required',
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Enter valid email address',
                }
            }
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: '••••••••',
            rules: {
                required: 'Password is required',
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                },
            }
        },
        {
            name: 'contact_number',
            label: 'Contact',
            type: 'tel',
            placeholder: '1234567890',
            rules: {
                required: 'Contact number is required',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Contact must be 10 digits',
                }
            }
        }
    ]

    return (
        <>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <button
                    onClick={() => setRegType(regType === 'Employee' ? 'Organization' : 'Employee')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
                >
                    Switch to {regType === 'Employee' ? 'Organization' : 'Employee'} Registration
                </button>
            </div>

            {regType === 'Employee' ? (
                <AuthForm
                    type='Registration'
                    title={
                        <>
                            Register <span className='text-2xl font-bold text-gray-700'> as Employee </span>
                        </>
                    }
                    fields={empFields}
                    submitUrl='/api/accounts/register'
                    redirectTo='/login'
                    background={background}
                    cssSpace='space-y-3'
                    showImageOnRight={true}
                    showImageOnLeft={false}
                    additionalData={{
                        is_business:false,
                        is_warehouse_staff:true
                    }}
                />
            ) : (
                <AuthForm
                    type='Registration'
                    title={
                        <>
                            Register <span className="text-2xl font-bold text-gray-700">as Organization</span>
                        </>
                    }
                    fields={orgFields}
                    submitUrl='/api/accounts/register'
                    redirectTo='/login'
                    background={background}
                    cssSpace='space-y-3'
                    showImageOnLeft={true}
                    showImageOnRight={false}
                    additionalData={{
                        is_business:true,
                        is_warehouse_staff:false
                    }}
                />
            )}
        </>
    )
}

export default RegisterPage