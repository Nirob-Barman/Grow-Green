
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const navOptions = (
        <ul className="flex items-center space-x-4">
            <li>
                <Link to="/" className="text-blue-500 hover:text-blue-600">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/dashboard" className="text-blue-500 hover:text-blue-600">
                    Dashboard
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
            {/* Add more navigation options here */}
        </ul>
    );
    return (
        <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center"> {/* Use flex-wrap to allow items to wrap */}
                    <div className="text-xl font-bold mx-auto mb-4 sm:mb-0 sm:text-2xl md:text-3xl">Admin Dashboard</div> {/* Use responsive text sizes */}
                    {/* Add any user-specific information or controls here */}
                </div>

                <div className="navigation-bar mt-4">
                    {navOptions}
                </div>

                {/* Add other content for the user dashboard here */}
            </div>
        </div>

    );
};

export default AdminDashboard;