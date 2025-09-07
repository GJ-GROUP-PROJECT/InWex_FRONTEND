import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormContent from './FormContent'
import ImageContent from './ImageContent'

const AuthForm = ({
    type = 'Login',
    title,
    fields = [],
    submitUrl = 'api/accounts/login',
    redirectTo = '/',
    background = '../assets/images/LoginPageImage.jpg',
    cssSpace = 'space-y-6',
    showImageOnLeft = false,
    showImageOnRight = true
}) => {
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
        <div className="min-h-screen flex flex-col md:flex-row">
            {showImageOnLeft && (
                <ImageContent
                    background={background}
                    alt="Auth Background"
                    position="left"
                />
            )}
            <FormContent
                type={type}
                title={title}
                fields={fields}
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
                cssSpace={cssSpace}
            />
            {showImageOnRight && !showImageOnLeft && (
                <ImageContent
                    background={background}
                    alt="Auth Background"
                    position="right"
                />
            )}
        </div>
    )
}

export default AuthForm
