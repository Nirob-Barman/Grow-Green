import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useSalesman from "../Hooks/useSalesman";

const SalesmanRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // console.log("SalesmanRoute email:", user.email);

    const [isSalesman, isSalesmanLoading] = useSalesman();
    // console.log('SalesmanRoute: ',isSalesman);
    const location = useLocation();

    if (loading || isSalesmanLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isSalesman) {
        return children;
    }

    // If the user is not authenticated or not a salesman, navigate to the home page
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default SalesmanRoute;
