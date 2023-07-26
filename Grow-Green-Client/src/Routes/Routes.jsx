import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageUsers from "../Pages/DashBoard/AdminPanel/ManageUsers";
import SalesmanDashboard from "../Pages/DashBoard/SalesMan/SalesmanDashboard";
import AddProducts from "../Pages/DashBoard/SalesMan/AddProducts/AddProducts";
import ProductList from "../Pages/DashBoard/SalesMan/ProductList/ProductList";
import ManageProducts from "../Pages/DashBoard/AdminPanel/ManageProducts/ManageProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
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
            // Admin Routes
            {
                path: 'manageUsers',
                element: <ManageUsers />
            },
            {
                path: 'manageProducts',
                element: <ManageProducts />
            },
            // Salesman Routes
            {
                path: 'salesmanDashboard',
                element: <SalesmanDashboard />
            },
            {
                path: 'addProducts',
                element: <AddProducts />
            },
            {
                path: 'productList',
                element: <ProductList />
            }
        ]
    },
]);
