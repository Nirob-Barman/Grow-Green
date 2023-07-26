import React from 'react';
import useProducts from '../../../../Hooks/useProducts';

const ProductList = () => {

    const [products] = useProducts();
    // console.log(products);

    const handleUpdate = () => {

    }

    return (
        // <div className="container mx-auto mt-8">
        //     <h2 className="text-2xl font-bold mb-4">Product List</h2>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //         {products.map((product) => (
        //             <div
        //                 key={product._id}
        //                 className="bg-white border rounded-lg p-4 shadow-md"
        //             >
        //                 <h3 className="text-lg font-bold">{product.productName}</h3>
        //                 <p className="text-gray-600 mb-2">Category: {product.category}</p>
        //                 <p className="text-gray-600 mb-2">
        //                     Total Available Products: {product.availableProducts}
        //                 </p>
        //                 <p className="text-gray-600 mb-2">
        //                     Status: {product.status === 'approved' ? 'Approved' : product.status === 'denied' ? 'Denied' : 'Pending'}
        //                 </p>
        //                 {product.status === 'denied' && (
        //                     <>
        //                         <p className="text-red-500 font-semibold mb-2">Feedback:</p>
        //                         <p className="text-gray-600 mb-4">{product.feedback}</p>
        //                     </>
        //                 )}
        //                 <button
        //                     className="px-4 py-2 bg-blue-500 text-white rounded-md"
        //                     onClick={() => handleUpdate(product._id)}
        //                 >
        //                     Update
        //                 </button>
        //             </div>
        //         ))}
        //     </div>
        // </div>


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
        </div>
    );
};

export default ProductList;
