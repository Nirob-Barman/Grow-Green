import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const { user, userRole } = useAuth();
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the server when the component mounts
        fetchProducts();
    }, []);

    useEffect(() => {
        // Fetch selected products for the current user (if logged in)
        if (user && userRole === 'user') {
            fetchSelectedProducts();
        }
    }, [user, userRole]);


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data.filter((productData) => productData.status === 'approved'));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSelectedProducts = async () => {
        try {
            // Fetch selected products for the current user
            const response = await axios.get(`http://localhost:5000/selectedProducts/${user.email}`);
            setSelectedProducts(response.data.map((selectedProducts) => selectedProducts.productId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectedProducts = async (productId, productItem) => {
        // console.log('selecting start',productId, productItem);

        try {
            // Check if the class is already selected by the current user
            if (selectedProducts.includes(productId)) {
                // if (selectedProducts.includes(uniqueIdentifier)) {
                Swal.fire({
                    icon: 'info',
                    title: 'Product Already Selected',
                    text: 'You have already selected this Product.',
                });
                return; // Exit the function if already selected
            }


            // Send the class data to the server
            try {
                // Assuming productItem is an object containing the product details
                const { _id, productName, productImage, availableProducts, price, category, status, displayName, email } = productItem;

                // Send the _id field as the product id
                await axios.post('http://localhost:5000/selectedProducts/', {
                    productId: _id, // Sending _id as productId
                    productName,
                    productImage,
                    supplierEmail: email,
                    supplierName: displayName,
                    availableProducts,
                    price,
                    category,
                    status,
                    bookingEmail: user?.email,
                    bookingUser: user?.displayName,
                    payStatus: 'unpaid'
                });

                // If the request is successful, handle the response or any other necessary actions
            } catch (error) {
                // Handle errors, e.g., display an error message or log the error
            }

            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Product Selected!',
                text: 'You have successfully selected the product.',
            });


            // console.log('Class selected:', classId);
            console.log('Class:', productItem);

            // Update the selected products state for the current user
            setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, productId]);

            // Optionally, you can perform any additional actions after the data is successfully sent
        } catch (error) {
            console.error('Error selecting class:', error);
            // Handle error, if any
        }
    };

    return (
        <div>
            <div className="container mx-auto mt-8">
                <h2 className="text-3xl font-semibold mb-4">products Page</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((productData) => (
                        <div
                            key={productData._id}
                            className={`bg-white p-4 rounded-lg ${productData.availableSeats === '0' ? 'bg-red-200' : ''
                                }`}
                        >
                            <img
                                src={productData.productImage}
                                alt={productData.productName}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <p className="text-lg font-semibold">{productData.productName}</p>
                            <p className="text-sm text-gray-600 mb-2">Product: {productData.displayName}</p>
                            <p className="text-sm text-gray-600 mb-2">Available Products: {productData.availableProducts}</p>
                            <p className="text-sm text-gray-600 mb-4">Price: {productData.price}</p>


                            {user ? (
                                userRole === 'user' && productData.availableSeats !== '0' ? (
                                    <button
                                        onClick={() => handleSelectedProducts(productData._id, productData)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
                                    >
                                        Select
                                    </button>
                                ) : (
                                    <p className="text-red-500">
                                        {productData.availableSeats === '0' ? 'No available seats' : ''}
                                    </p>
                                )
                            ) : (
                                <p className="text-red-500">
                                    {/* Please log in to select a course */}
                                    <Link to="/login" className="btn btn-error">
                                        <button>Log in to Purchase</button>
                                    </Link>
                                </p>
                            )}


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;

