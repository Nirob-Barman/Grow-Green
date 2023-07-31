import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { userRole, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div>
                <div className="container mx-auto p-4">
                    <div className="flex flex-col md:flex-row">
                        <div className="bg-white shadow-md md:w-1/5 p-4">
                            {/* Sidebar */}
                            {
                                userRole === 'admin' ? <>

                                    <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link to="/dashboard/information" className="text-blue-500 hover:text-blue-600">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Posts</Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard/users" className="text-blue-500 hover:text-blue-600">Users</Link>
                                        </li>
                                        <li>
                                            <Link to='/dashboard/reports' className="text-blue-500 hover:text-blue-600">Analytics and Reports</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Offers and Promotions</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Customer Support</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Salesman Performance</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Settings</Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleLogOut} className="text-blue-500 hover:text-blue-600">Logout</Link>
                                        </li>
                                    </ul>
                                </> : userRole === 'salesman' ? <>
                                    <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link to="/dashboard/information" className="text-blue-500 hover:text-blue-600">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Sales Orders</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Customer List</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Sales Reports</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Customer Feedback</Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleLogOut} className="text-blue-500 hover:text-blue-600">Logout</Link>
                                        </li>
                                    </ul>
                                </> : <>
                                    <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link to="/dashboard/information" className="text-blue-500 hover:text-blue-600">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard/selectedProducts" className="text-blue-500 hover:text-blue-600">Cart</Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard/payment" className="text-blue-500 hover:text-blue-600">Checkout</Link>
                                        </li>
                                        <li>
                                            <Link className="text-blue-500 hover:text-blue-600">Order History</Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard/information" className="text-blue-500 hover:text-blue-600">My Account</Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleLogOut} className="text-blue-500 hover:text-blue-600">Logout</Link>
                                        </li>
                                    </ul>
                                </>
                            }
                        </div>
                        <div className="bg-white shadow-md md:flex-1 p-4">
                            {/* Main Content */}
                            <h2 className="text-2xl font-semibold mb-4">Welcome to {userRole === 'admin' ? 'Admin' : userRole === 'salesman' ? 'Salesman' : 'User'} Dashboard</h2>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus sem non enim lacinia, in viverra sapien tincidunt. Ut fermentum odio sit amet sagittis varius.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;