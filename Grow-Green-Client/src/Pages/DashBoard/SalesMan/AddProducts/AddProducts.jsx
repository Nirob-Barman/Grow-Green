import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useSweetAlert from '../../../../Hooks/useSweetAlert';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddProducts = () => {

    const [imageUrl, setImageUrl] = useState('');
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const sweetAlert = useSweetAlert();

    // Assuming you have implemented useAuth() correctly to get user info
    const { user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    // Function to handle image upload to ImgBB
    const handleImageUpload = async (e) => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            // Upload the image to ImgBB server
            const response = await axios.post(img_hosting_url, formData);

            // Get the image URL from the response and set it in the state
            if (response.data && response.data.data && response.data.data.url) {
                setImageUrl(response.data.data.url);
            }
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };



    const onSubmit = async (data) => {
        try {
            // Add the pending status to the form data
            const formData = { ...data, status: 'pending' };

            // If an image has been uploaded, add the image URL to the form data
            if (imageUrl) {
                formData.productImage = imageUrl;
            }


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
                reset();

                // Show the success message
                sweetAlert.showSuccessMessage();

                // Navigation to desired page
                navigate(from, { replace: true });
            }
        } catch (error) {
            // Handle the error
            // console.error('Failed to add products:', error);

            // Show an error message
            sweetAlert.showErrorMessage();
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

                <div className="flex flex-col">
                    <label htmlFor="productImage" className="mb-1 font-medium text-gray-700">
                        Product Image
                    </label>
                    <input
                        type="file" // Change the input type to file
                        id="productImage"
                        onChange={handleImageUpload} // Call the handleImageUpload function on file change
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
                        <option value="seeds">Seeds</option>
                        <option value="soil">Soil and Fertilizer</option>
                        <option value="seeding-tray">Seeding Tray</option>
                        <option value="tools-accessories">Tools and Accessories</option>
                        <option value="pots-containers">Pots and Containers</option>
                        <option value="stones-pebbles">Stones and Pebbles</option>
                        <option value="sprinkler-irrigation">Sprinkler and Irrigation</option>
                        <option value="indoor-plants">Indoor/Decorative Plants</option>
                        <option value="packaging-materials">Packaging Materials</option>
                    </select>
                </div>

                {/* Add button */}
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-green-500 rounded-md"
                    style={{ color: 'blue' }}
                >
                    Submit Product
                </button>
            </form>
        </div>
    );
};

export default AddProducts;