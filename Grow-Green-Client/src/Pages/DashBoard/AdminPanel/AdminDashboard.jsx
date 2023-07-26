import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const navOptions = (
        <ul className="flex items-center">
            <li><Link to="/manageUsers">Manage Users</Link></li>
            <li><Link to="/manageProducts">Manage Products</Link></li>
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

export default AdminDashboard;