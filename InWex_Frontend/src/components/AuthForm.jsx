import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FormContent from "./FormContent";
import ImageContent from "./ImageContent";

const AuthForm = ({
    type = "Login",
    title,
    fields = [],
    submitUrl = "api/accounts/login",
    redirectTo = "/",
    background = "../assets/images/LoginPageImage.jpg",
    cssSpace = "space-y-6",
    showImageOnLeft = false,
    showImageOnRight = true,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(submitUrl, data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            toast.success(`${type} Successful`);
            navigate(redirectTo);
        } catch (error) {
            if (error.response) {
                let message = "Something went wrong";

                const data = error.response.data;
                if (typeof data === "object" && data !== null) {
                    const firstKey = Object.keys(data)[0];
                    if (Array.isArray(data[firstKey])) {
                        message = data[firstKey][0];
                    } else {
                        message = data[firstKey];
                    }
                } else if (typeof data === "string") {
                    message = data;
                }

                toast.error(`${type} Failed: ${message}`);
            } else if (error.request) {
                console.log("No response from server");
            } else {
                console.log(error.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {showImageOnLeft && (
                <ImageContent background={background} alt="Auth Background" position="left" />
            )}

            <FormContent
                type={type}
                title={title}
                fields={fields}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                cssSpace={cssSpace}
            />

            {showImageOnRight && !showImageOnLeft && (
                <ImageContent background={background} alt="Auth Background" position="right" />
            )}
        </div>
    );
};

export default AuthForm;
