import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import useFetchUsers from '../../../../Hooks/useFetchUsers';
import useSweetAlert from '../../../../Hooks/useSweetAlert';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {

    const { users, refetch } = useFetchUsers();
    console.log('All Users', users);
    const sweetAlert = useSweetAlert();

    const handleDelete = async (user) => {
        try {
            // Show a warning message before removing the user
            sweetAlert.showDeleteWarning(async () => {
                try {
                    await axios.delete(`https://grow-green-server.vercel.app/users/${user._id}`);
                    // Show a success message after removing the user
                    sweetAlert.showDeletionSuccessAlert();
                    // You can also call refetch() here to update the users list after deletion
                    await refetch();
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <div className="w-full">
                <Helmet>
                    <title>Dashboard | Users</title>
                </Helmet>
                <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'admin' ? 'Admin' : user.role === 'salesman' ? 'Salesman' : 'User'}</td>
                                    <td><button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;