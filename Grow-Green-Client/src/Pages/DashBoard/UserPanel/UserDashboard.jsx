import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {

    const navOptions = (
        <ul className="flex items-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/road">Home</Link></li>
            <li><Link to="/map">Home</Link></li>
            {/* <li><Link to="/instructors">Instructors</Link></li> */}
            {/* <li><Link to="/dashboard/dashboardPage">DashBoard</Link></li> */}
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

export default UserDashboard;