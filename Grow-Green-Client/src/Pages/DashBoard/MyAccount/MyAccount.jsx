import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useFetchUsers from '../../../Hooks/useFetchUsers';
import axios from 'axios';
import useSweetAlert from '../../../Hooks/useSweetAlert';

const MyAccount = () => {
    const { user } = useAuth();
    const { users, refetch } = useFetchUsers();
    const { register, handleSubmit, setValue } = useForm();

    const sweetAlert = useSweetAlert();

    const onSubmit = async (data) => {
        try {
            const userId = data._id;

            // Send the data to the server using Axios
            const updateUserEndpoint = `https://grow-green-server.vercel.app/users/${userId}`; // Replace with your server URL and appropriate endpoint
            await axios.patch(updateUserEndpoint, data); // Use PATCH method here
            // const response = await axios.patch(updateUserEndpoint, data); // Use PATCH method here

            // Assuming the server responds with a success message
            // console.log(response.data.message);


            // Show success message using the custom hook
            sweetAlert.showUpdateUserSuccessAlert();
            // Assuming you have an update function to update the user data locally, you can call it here.
            // updateUserData(data.name, data.email, data.phoneNumber);
        } catch (error) {
            // console.error('Error updating user:', error);
            sweetAlert.showUpdateUserErrorAlert();
        }
    };

    // Fetch user data when the component mounts or user.email changes
    useEffect(() => {
        refetch();
    }, [user.email, refetch]);

    // Fill form fields with user data when the users data is available
    useEffect(() => {
        if (users.length > 0) {
            const currentUser = users.find((userData) => userData.email === user.email);
            if (currentUser) {
                setValue('name', currentUser.name);
                setValue('email', currentUser.email);
                setValue('phoneNumber', currentUser.phoneNumber);
                setValue('role', currentUser.role);
                setValue('_id', currentUser._id);
            }
        }
    }, [users, user.email, setValue]);

    return (
        <div className="container mx-auto max-w-md p-6 bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* photoURL */}
                <div className="flex flex-col">
                    <label className="font-bold">Profile Picture</label>
                    {/* Parent div with Flexbox centering */}
                    <div className="flex items-center justify-center">
                        {/* We will use an image element to display the profile picture */}
                        <img
                            src="https://lh3.googleusercontent.com/a/AAcHTtcMd9AkwCS5EbrJs6Bs4i2msvssGiLItxwTtObBZEmgUF-7=s96-c"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* name */}
                <div className="flex flex-col">
                    <label className="font-bold">Name</label>
                    <input type="text" {...register('name')} className="border rounded p-2 bg-white" />
                </div>

                {/* email */}
                <div className="flex flex-col">
                    <label className="font-bold">Email</label>
                    <input type="email" {...register('email')} className="border rounded p-2 bg-white" />
                </div>

                {/* phoneNumber */}
                <div className="flex flex-col">
                    <label className="font-bold">Phone Number</label>
                    <input type="tel" {...register('phoneNumber')} className="border rounded p-2 bg-white" />
                </div>

                {/* role */}
                <div className="flex flex-col">
                    <label className="font-bold">Role</label>
                    <input type="text" defaultValue="admin" {...register('role')} readOnly className="border rounded p-2 bg-white" />
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                    Save
                </button>
            </form>
        </div>
    );
};

export default MyAccount;
