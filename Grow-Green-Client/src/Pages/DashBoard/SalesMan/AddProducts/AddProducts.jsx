import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProducts = () => {
    const { register, handleSubmit, reset } = useForm();

    // Assuming you have implemented useAuth() correctly to get user info
    const { user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            // Add the pending status to the form data
            const formData = { ...data, status: 'pending' };

            // Perform your database submission logic here
            // Set the status field to "pending" when creating a class
            formData.status = 'pending';
            formData.displayName = user?.displayName;
            formData.email = user?.email;

            // Send the form data to the server using Axios
            const response = await axios.post('http://localhost:5000/products', formData);
            console.log('Axios post submit data', response.data);

            if (response.data.message === 'Product created successfully') {
                // Reset the form after a successful addition
                // reset();

                // Show the success message using Swal.fire
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product added successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Navigation to desired page
                // navigate(from, { replace: true });
            }
        } catch (error) {
            // Handle the error
            console.error('Failed to add products:', error);

            // Show an error message using Swal.fire
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add product. Please try again later.',
            });
        }
    };





    return (
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="productName" className="mb-1 font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        {...register('productName', { required: true })}
                        className="px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Add other form fields here */}
                <div className="flex flex-col">
                    <label htmlFor="productImage" className="mb-1 font-medium text-gray-700">
                        Product Image
                    </label>
                    <input
                        type="text"
                        id="productImage"
                        {...register('productImage', { required: true })}
                        className="px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="supplierName" className="mb-1 font-medium text-gray-700">
                        Supplier Name
                    </label>
                    <input
                        type="text"
                        id="supplierName"
                        value={user?.displayName} // Assuming displayName is the name of the supplier in the user object
                        readOnly
                        className="px-3 py-2 border rounded-md bg-gray-100"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="supplierEmail" className="mb-1 font-medium text-gray-700">
                        Supplier Email
                    </label>
                    <input
                        type="email"
                        id="supplierEmail"
                        value={user?.email} // Assuming email is the email of the supplier in the user object
                        readOnly
                        className="px-3 py-2 border rounded-md bg-gray-100"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="availableProducts" className="mb-1 font-medium text-gray-700">
                        Available Products
                    </label>
                    <input
                        type="number"
                        id="availableProducts"
                        {...register('availableProducts', { required: true, min: 0 })}
                        className="px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="mb-1 font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        {...register('price', { required: true, min: 0 })}
                        className="px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="category" className="mb-1 font-medium text-gray-700">
                        Category
                    </label>
                    <select id="category" {...register('category', { required: true })} className="px-3 py-2 border rounded-md">
                        <option value="">Select a category</option>
                        <option value="tree">Tree</option>
                        <option value="decoration">Decoration Items</option>
                        <option value="fertilizer">Fertilizer</option>
                    </select>
                </div>

                {/* Add button */}
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProducts;