import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageUsers from "../Pages/DashBoard/AdminPanel/ManageUsers";
import AddProducts from "../Pages/DashBoard/SalesMan/AddProducts/AddProducts";
import ProductList from "../Pages/DashBoard/SalesMan/ProductList/ProductList";
import ManageProducts from "../Pages/DashBoard/AdminPanel/ManageProducts/ManageProducts";
import AllProducts from "../Pages/Home/AllProducts/AllProducts";
import SelectedProducts from "../Pages/DashBoard/UserPanel/SelectedProducts/SelectedProducts";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/DashBoard/Payment/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import SalesmanRoute from "./SalesmanRoute";
import UserRoute from "./UserRoute";
import UpdateRole from "../Pages/DashBoard/UpdateRole/UpdateRole";
import AllReviews from "../Pages/Shared/AllReviews/AllReviews";
import Products from "../Pages/Products/Products/Products";
import Order from "../Pages/Order/Order/Order";
import AllUsers from "../Pages/DashBoard/AdminPanel/AllUsers/AllUsers";
import Dashboard from "../Layout/Dashboard";
import Services from "../Pages/Shared/Services/Services";
import DashboardPage from "../Pages/DashBoard/DashboardPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/order/:category',
                element: <Order />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
            {
                path: '/allProducts',
                element: <AllProducts />
            },
            {
                path: '/all-reviews',
                element: <AllReviews />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'information',
                element: <DashboardPage />
            },
            {
                path: 'updateRole',
                element: <UpdateRole />
            },
            {
                path: 'payment',
                element: <Payment />
                // element: <UserRoute><Payment /></UserRoute>
            },
            // Admin Routes
            {
                path: 'users',
                element: <AllUsers />
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'manageProducts',
                element: <AdminRoute><ManageProducts /></AdminRoute>
            },
            // User Routes
            {
                path: 'selectedProducts',
                element: <UserRoute><SelectedProducts /></UserRoute>
            },
            // Salesman Routes
            {
                path: 'addProducts',
                element: <SalesmanRoute><AddProducts /></SalesmanRoute>
            },
            {
                path: 'productList',
                element: <SalesmanRoute><ProductList /></SalesmanRoute>
            },
        ]
    }
]);
