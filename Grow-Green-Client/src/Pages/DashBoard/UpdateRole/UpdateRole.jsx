// UpdateRole.js
import React, { useState } from 'react';

const UpdateRole = () => {
    const [newRole, setNewRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the role update logic here, e.g., make an API call to update the user's role
        console.log('New Role:', newRole);
    };

    return (
        <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Update Your Role</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="newRole" className="block font-medium text-gray-700">
                        Select Role:
                    </label>
                    <select
                        id="newRole"
                        name="newRole"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="admin">Admin</option>
                        <option value="salesman">Salesman</option>
                        {/* Add other role options here */}
                    </select>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 font-medium  bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled
                >
                    Request to Update the Role
                </button>
            </form>
        </div>
    );
};

export default UpdateRole;
