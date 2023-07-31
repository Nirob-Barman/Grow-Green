import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useSweetAlert from '../../../Hooks/useSweetAlert';
import axios from 'axios';
import useWishedProducts from '../../../Hooks/useWishedProducts';
import { Link } from 'react-router-dom';

const OrderTab = ({ items }) => {

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [, refetch] = useWishedProducts();

    const sweetAlert = useSweetAlert();
    const { user, userRole } = useAuth();

    useEffect(() => {
        // Fetch selected products for the current user (if logged in)
        if (user && userRole === 'user') {
            fetchSelectedProducts();
        }
    }, [user, userRole]);


    const fetchSelectedProducts = async () => {
        try {
            // Fetch selected products for the current user
            const response = await axios.get(`https://grow-green-server.vercel.app/selectedProducts/${user.email}`);
            setSelectedProducts(response.data.map((selectedProducts) => selectedProducts.productId));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePurchase = () => {
        if (user) {
            // Handle the product selection logic if the user is logged in
        } else {
            sweetAlert.showLoginConfirmationAlert(
                () => {
                },
                () => {
                    window.history.back();
                }
            );
        }
    };


    const handleSelectedProducts = async (productId, productItem) => {

        try {
            // Check if the class is already selected by the current user
            if (selectedProducts.includes(productId)) {
                sweetAlert.showProductAlreadySelectedAlert();
                return; // Exit the function if already selected
            }

            try {
                const { _id, productName, productImage, availableProducts, price, category, status, displayName, email } = productItem;

                await axios.post('https://grow-green-server.vercel.app/selectedProducts/', {
                    productId: _id,
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
                    payStatus: 'unpaid',
                });
            } catch (error) {
                // Handle errors, e.g., display an error message or log the error
            }
            sweetAlert.showProductSelectedAlert();
            refetch();
            setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, productId]);
        } catch (error) {
            console.error('Error selecting class:', error);
        }
    };



    return (
        <div>
            <div>
                <div className="container mx-auto mt-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {items.map((productData) => (
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
                                            <button onClick={handlePurchase}>Purchase</button>
                                        </Link>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTab;