import React from 'react';
import { Link } from 'react-router-dom';

const SalesmanDashboard = () => {
    const navOptions = (
        <ul className="flex items-center">
            <li><Link to="/salesmanDashboard">Salesman Dashboard</Link></li>
            <li><Link to="/addProducts">Add Products</Link></li>
            <li><Link to="/productList">Product List</Link></li>
        </ul>
    );

    return (
        <div>
            <ul className="menu menu-horizontal px-1">
                {/* Navigation options */}
                {navOptions}
            </ul>
        </div>
    );
};

export default SalesmanDashboard;

