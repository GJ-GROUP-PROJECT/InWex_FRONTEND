import AuthForm from '../components/AuthForm'
import background from '../assets/images/LoginPageImage.jpg'

const LoginPage = () => {
    return (
        <>
            <AuthForm
                type='Login'
                fields={[
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
                            minlength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            }
                        }
                    },
                ]}
                submitUrl='/api/accounts/login'
                redirectTo='/'
                background={background}
                cssSpace='space-y-5'
                showImageOnRight={true}
                showImageOnLeft={false}
            />
        </>
    )
}

export default LoginPage
