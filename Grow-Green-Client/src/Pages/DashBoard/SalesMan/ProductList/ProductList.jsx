import { useState } from 'react';
import useProducts from '../../../../Hooks/useProducts';

const ProductList = () => {

    const [products] = useProducts();
    console.log(products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);

    const handleUpdate = (productData) => {
        setSelectedProduct(productData);
        setEditedProduct({ ...productData });
        setModalVisible(true);
    };


    const handleSave = () => {
        // Handle saving changes here (e.g., update the product in the database)
        // After saving, close the modal
        setModalVisible(false);
        setSelectedProduct(editedProduct); // Update the selected product with the edited values
    };

    const handleCancel = () => {
        // Handle discarding changes here (e.g., reset the edited product to the original product data)
        // After discarding, close the modal
        setModalVisible(false);
        setEditedProduct(null);
    };

    return (
        <div className="flex flex-col items-center m-4">
            <div className="text-center text-xl font-bold mb-4">My products are here</div>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Available Products</th>
                        <th className="border px-4 py-2">Feedback</th>
                        <th className="border px-4 py-2">Update</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((productData) => (
                        <tr key={productData._id} className={productData?.status === 'denied' ? 'bg-red-200' : 'bg-white'}>
                            <td className="border px-4 py-2">{productData?.productName}</td>
                            <td className="border px-4 py-2">{productData?.status}</td>
                            <td className="border px-4 py-2">{productData?.availableProducts}</td>
                            <td className="border px-4 py-2">{productData?.feedback ? productData.feedback : "N/A"}</td>
                            <td className="border px-4 py-2">
                                {/* {productData.status !== 'pending' && (
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdateClass(productData._id)}
                                    >
                                        Update
                                    </button>
                                )} */}
                                {
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdate(productData._id)}
                                    >
                                        Update
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}

            {/* Modal */}
            {isModalVisible && selectedProduct && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Product Details</h2>

                        {/* Product Name */}
                        <div className="mb-4">
                            <label className="font-bold">Product Name:</label>
                            <input
                                type="text"
                                value={editedProduct?.productName || ''}
                                onChange={(e) => setEditedProduct({ ...editedProduct, productName: e.target.value })}
                                className="block w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>

                        {/* Product Image */}
                        <div className="mb-4">
                            <label className="font-bold">Product Image:</label>
                            <input
                                type="text"
                                value={editedProduct?.productImage || ''}
                                onChange={(e) => setEditedProduct({ ...editedProduct, productImage: e.target.value })}
                                className="block w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>

                        {/* Available Products */}
                        <div className="mb-4">
                            <label className="font-bold">Available Products:</label>
                            <input
                                type="text"
                                value={editedProduct?.availableProducts || ''}
                                onChange={(e) => setEditedProduct({ ...editedProduct, availableProducts: e.target.value })}
                                className="block w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="font-bold">Price:</label>
                            <input
                                type="text"
                                value={editedProduct?.price || ''}
                                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                                className="block w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="font-bold">Category:</label>
                            <input
                                type="text"
                                value={editedProduct?.category || ''}
                                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                                className="block w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductList;
