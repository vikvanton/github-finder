import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import AlertContext from "../components/context/alert/AlertContext";

function NotFound() {
    const {
        alert: { type, msg },
        dispatchAlert,
    } = useContext(AlertContext);

    useEffect(() => {
        return () => {
            if (type === "requestError") {
                dispatchAlert({ type: "REMOVE_ALERT" });
            }
        };
    }, [type, dispatchAlert]);

    return (
        <div className="hero">
            <div className="text-center hero-content">
                <div className="max-w-lg">
                    <h1 className="text-8xl font-bold mb-8">Oops!</h1>
                    {type === "requestError" ? (
                        <p className="text-5xl mb8 mb-8">{msg}</p>
                    ) : (
                        <p className="text-5xl mb8 mb-8">
                            404 - Page not found!
                        </p>
                    )}
                    <Link to="/" className="btn btn-primary">
                        <FaHome className="mr-2" />
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
