import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";

const UserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isUser, isUserLoading] = useUser();
    const location = useLocation();

    if (loading || isUserLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isUser) {
        return children;
    }

    // If the user is not authenticated or not a regular user, navigate to the home page
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default UserRoute;
