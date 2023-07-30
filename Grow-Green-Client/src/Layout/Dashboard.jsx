import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {

    const { userRole, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = (
        // <ul className="flex items-center space-x-4">
        // <ul className="flex items-center space-x-4 justify-center bg-gray-200 py-4">
        <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center bg-gray-200 py-4">
            <li>
                <Link to="/" className="text-blue-500 hover:text-blue-600">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/dashboard/information" className="text-blue-500 hover:text-blue-600">
                    Dashboard
                </Link>
            </li>



            {
                userRole === 'admin' ? <>
                    <li>
                        <Link to="/dashboard/users" className="text-blue-500 hover:text-blue-600">
                            Users
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/manageUsers" className="text-blue-500 hover:text-blue-600">
                            Manage Users
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/manageProducts" className="text-blue-500 hover:text-blue-600">
                            Manage Products
                        </Link>
                    </li>
                </> :
                    userRole === 'salesman' ? <>
                        <li>
                            <Link to="/dashboard/addProducts" className="text-blue-500 hover:text-blue-600">
                                Add Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/productList" className="text-blue-500 hover:text-blue-600">
                                Product List
                            </Link>
                        </li>
                    </> : <>
                        <li>
                            <Link to="/dashboard/selectedProducts" className="text-blue-500 hover:text-blue-600">
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/bookingProducts" className="text-blue-500 hover:text-blue-600">
                                Paid Product
                            </Link>
                        </li>
                    </>
            }

            <li>
                <Link onClick={handleLogOut} className="text-blue-500 hover:text-blue-600">
                    LogOut
                </Link>
            </li>
            {/* Add more navigation options here */}
        </ul>
    );

    return (

        <div>
            <div className="bg-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="text-xl font-bold mx-auto mb-4 sm:mb-0">
                            {userRole === 'admin' ? 'Admin' : userRole === 'salesman' ? 'Salesman' : 'User'} Dashboard
                        </div>
                        {/* Add any user-specific information or controls here */}
                    </div>

                    <div className="navigation-bar mt-4">
                        {navOptions}
                    </div>

                    {/* Add other content for the user dashboard here */}
                </div>
            </div>

            <div className='text-center'>
                <Outlet></Outlet>
            </div>



        </div>
    );
};

export default Dashboard;