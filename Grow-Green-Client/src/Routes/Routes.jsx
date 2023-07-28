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
import Dashboard from "../Pages/DashBoard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/DashBoard/Payment/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import SalesmanRoute from "./SalesmanRoute";
import UserRoute from "./UserRoute";

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
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'payment',
                element: <Payment />
                // element: <UserRoute><Payment /></UserRoute>
            },
            // Admin Routes
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
