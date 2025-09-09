import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-bold text-blue-600">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>
                <p className="mt-2 text-gray-600">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="mt-6 flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-blue-600 text-white px-10 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
