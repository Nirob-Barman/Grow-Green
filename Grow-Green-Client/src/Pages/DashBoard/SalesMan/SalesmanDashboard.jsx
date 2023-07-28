
import { Link } from 'react-router-dom';

const SalesmanDashboard = () => {

    const navOptions = (
        // <ul className="flex items-center space-x-4">
        <ul className="flex items-center space-x-4 justify-center bg-gray-200 py-4">
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
                <Link to="/dashboard/addProducts" className="text-blue-500 hover:text-blue-600">
                    Add Products
                </Link>
            </li>
            <li>
                <Link to="/dashboard/productList" className="text-blue-500 hover:text-blue-600">
                    Product List
                </Link>
            </li>
            {/* Add more navigation options here */}
        </ul>
    );

    return (
        <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold mx-auto">Salesman Dashboard</div>
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

export default SalesmanDashboard;

