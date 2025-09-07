import AuthForm from '../components/AuthForm'
import background from '../assets/images/LoginPageImage.jpg'

const LoginPage = () => {
    return (
        <>
            <AuthForm
                type='Login'
                fields={[
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'test@example.com' },
                    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                ]}
                submitUrl='/api/accounts/login'
                redirectTo='/'
                background={background}
                cssSpace='space-y-5'
            />
        </>
    )
}

export default LoginPage
