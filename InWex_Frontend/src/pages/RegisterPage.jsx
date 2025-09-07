import background from '../assets/images/RegisterPageImage.jpeg'
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    return (
        <AuthForm
            type='Register as Employee'
            fields={[
                { name: 'fullname', label: 'Full Name', type: 'text', placeholder: 'Test Example' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'test@example.com' },
                { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                { name: 'contact', label: 'Contact', type: 'tel', placeholder: '+91 12345-67890', pattern: '[0-9]{10}' },
            ]}
            submitUrl='/api/accounts/register'
            redirectTo='/login'
            background={background}
            cssSpace='space-y-3'
        />
    )
}

export default RegisterPage