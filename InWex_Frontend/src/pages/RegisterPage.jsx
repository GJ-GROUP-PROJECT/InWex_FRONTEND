import { useState } from 'react';
import background from '../assets/images/RegisterPageImage.jpeg'
import AuthForm from '../components/AuthForm.jsx';

const RegisterPage = () => {
    const [regType, setRegType] = useState('Employee')

    const empFields = [
        { name: 'fullname', label: 'Full Name', type: 'text', placeholder: 'Test Example' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'test@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
        { name: 'contact_number', label: 'Contact', type: 'tel', placeholder: '+91 12345-67890', pattern: '[0-9]{10}' },
    ]

    const orgFields = [
        { name: 'orgName', label: 'Org Name', type: 'text', placeholder: 'Test Example' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'test@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
        { name: 'contact_number', label: 'Contact', type: 'tel', placeholder: '+91 12345-67890', pattern: '[0-9]{10}' },
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
                    type='Register as Employee'
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
                />
            ) : (
                <AuthForm
                    type='Register as Organization'
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
                />
            )}
        </>
    )
}

export default RegisterPage