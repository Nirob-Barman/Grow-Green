import axios from "axios";
import useWishedProducts from "../../../../Hooks/useWishedProducts";
import Swal from "sweetalert2";

const SelectedProducts = () => {
    const [wishListedProducts, refetch] = useWishedProducts();

    const handleDeleteProduct = async (productId) => {
        try {
            // Send a DELETE request to the server to delete the product
            await axios.delete(`http://localhost:5000/selectedProducts/${productId}`);

            // If the request is successful, you can update the UI or refetch the data
            console.log(`Deleting product with ID: ${productId}`);

            // You can choose to refetch the data to update the displayed products
            refetch();

            // Alternatively, you can remove the deleted product from the state directly (if it's managed in a state)
            // setWishListedProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));

            // Show a success message using SweetAlert2 or other UI components
            Swal.fire({
                icon: 'success',
                title: 'Product Deleted',
                text: 'The product has been successfully deleted.',
            });

        } catch (error) {
            // Handle errors, e.g., display an error message or log the error
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Selected Products</h2>
            {wishListedProducts.map((product) => (
                <div key={product._id} className="border p-4 mb-4">
                    {/* Product Info */}
                    <p className="font-bold mb-2">{product.productName}</p>
                    <img src={product.productImage} alt={product.productName} className="w-20 h-20 object-cover mb-2" />
                    <p className="mb-2">Supplier: {product.supplierName}</p>
                    <p className="mb-2">Price: ${product.price}</p>

                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-red-500 text-white mr-2 rounded"
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            Delete
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => {
                                // Implement the logic to handle payment for the selected product
                                console.log(`Paying for product with ID: ${product.productId}`);
                            }}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedProducts;
