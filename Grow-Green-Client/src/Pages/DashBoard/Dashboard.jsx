import React from 'react';
import useAuth from '../../Hooks/useAuth';
import AdminDashboard from './AdminPanel/AdminDashboard';
import UserDashboard from './UserPanel/UserDashboard';
import SalesmanDashboard from './SalesMan/SalesmanDashboard';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    const { userRole } = useAuth();

    return (
        <div>
            {
                userRole === 'admin' && <AdminDashboard />
            }

            {
                userRole === 'user' && <UserDashboard />
            }

            {
                userRole === 'salesman' && <SalesmanDashboard />
            }

            <div className='text-center'>
                <Outlet></Outlet>
            </div>



        </div>
    );
};

export default Dashboard;