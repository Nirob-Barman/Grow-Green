import axios from "axios";
import useWishedProducts from "../../../../Hooks/useWishedProducts";
import { Link } from "react-router-dom";
import useSweetAlert from "../../../../Hooks/useSweetAlert";
import { Helmet } from "react-helmet-async";

const SelectedProducts = () => {

    const [wishListedProducts, refetch] = useWishedProducts();

    const total = wishListedProducts.reduce((sum, item) => sum + parseFloat(item.price), 0);
    // console.log(total);
    const price = total.toFixed(2)

    const sweetAlert = useSweetAlert();

    const handleDeleteProduct = async (productId) => {
        try {
            // Send a DELETE request to the server to delete the product
            await axios.delete(`https://grow-green-server.vercel.app/selectedProducts/${productId}`);

            // If the request is successful, you can update the UI or refetch the data
            console.log(`Deleting product with ID: ${productId}`);

            // You can choose to refetch the data to update the displayed products
            refetch();

            // Alternatively, you can remove the deleted product from the state directly (if it's managed in a state)
            // setWishListedProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));

            // Show a success message using SweetAlert2 or other UI components
            sweetAlert.showDeleteSuccessMessage();

        } catch (error) {
            // Handle errors, e.g., display an error message or log the error
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="container mx-auto my-8">
            <Helmet>
                <title>Dashboard | Cart</title>
            </Helmet>
            {
                wishListedProducts.length > 0 ? <>
                    <h2 className="text-3xl font-bold mb-4">My Products</h2>

                    <div className="my-2">
                        <Link to='/dashboard/payment'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => {
                                    // Implement the logic to handle payment for the selected product

                                }}
                            >
                                CheckOut
                            </button>
                        </Link>
                    </div>

                </> : <h2 className="text-3xl font-bold mb-4">No Products are in the Cart</h2>
            }


            {wishListedProducts.map((product) => (
                <div key={product._id} className="border rounded p-4 mb-4 shadow-md">
                    <div className="flex justify-between items-center">
                        {/* Product Info */}
                        <div>
                            <p className="text-xl font-bold mb-2">{product.productName}</p>
                            <p className="text-gray-600 mb-2">Supplier: {product.supplierName}</p>
                            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                        </div>

                        {/* Buttons */}
                        <div>
                            <button
                                className="px-4 py-2 bg-red-500 text-white mr-2 rounded"
                                onClick={() => handleDeleteProduct(product._id)}
                            >
                                Delete
                            </button>



                            <Link to={{ pathname: '/dashboard/payment' }}>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={() => {
                                        // Implement the logic to handle payment for the selected product
                                        // console.log(`Paying for product with ID: ${product.productId}`);
                                    }}
                                >
                                    Pay
                                </button>
                            </Link>


                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedProducts;



