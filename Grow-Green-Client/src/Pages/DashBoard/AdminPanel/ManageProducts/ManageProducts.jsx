import { useState, useEffect } from 'react';
import axios from 'axios';

// Import the daisyUI classes for the modal component
import 'daisyui/dist/full.css';
import { Helmet } from 'react-helmet-async';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch class data from the server when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://grow-green-server.vercel.app/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle approving or denying a class
    const handleApproval = async (classId, status) => {
        try {
            // Make a PATCH request to update the class status on the server
            const response = await axios.patch(`https://grow-green-server.vercel.app/products/${classId}`, { status });

            // Update the class status on the client-side after successful server update
            const updatedClasses = products.map(product =>
                product._id === classId ? { ...product, status } : product
            );
            setProducts(updatedClasses);
        } catch (error) {
            console.error(error);
        }
    };

    // State and function to handle the feedback modal
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');

    // State to store the class ID for which feedback is being entered
    const [currentClassId, setCurrentClassId] = useState('');


    // Function to set the current class ID when the "Send Feedback" button is clicked
    const handleFeedbackModal = (classId) => {
        setCurrentClassId(classId); // Set the current class ID
        setShowModal(true); // Open the feedback modal
    };

    const handleSendFeedback = async () => {
        try {
            // You can use the feedback state to send the feedback to the server
            console.log('Feedback:', feedback);

            // Send the feedback to the server using a POST request for the current class ID
            const response = await axios.post(`https://grow-green-server.vercel.app/products/${currentClassId}/feedback`, { feedback });

            // Update the class feedback on the client-side after successful server update
            const updatedClasses = products.map(product =>
                product._id === currentClassId ? { ...product, feedback } : product
            );
            setProducts(updatedClasses);

            // Reset the feedback state and hide the modal
            setFeedback('');
            setCurrentClassId('');
            setShowModal(false);
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Manage Products</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Products Image</th>
                            <th className="px-4 py-2">Products Name</th>
                            <th className="px-4 py-2">Salesman Name</th>
                            <th className="px-4 py-2">Salesman Email</th>
                            <th className="px-4 py-2">Available Products</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="px-4 py-2">
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2">{product.productName}</td>
                                <td className="px-4 py-2">{product.displayName}</td>
                                <td className="px-4 py-2">{product.email}</td>
                                <td className="px-4 py-2">{product.availableProducts}</td>
                                <td className="px-4 py-2">{product.price}</td>
                                <td className="px-4 py-2">{product.status}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleApproval(product._id, product.status === 'approved' ? 'pending' : 'approved')}
                                        className={`btn btn-ghost ${product.status === 'approved' ? 'btn-denied' : 'btn-approved'}`}
                                    >
                                        {product.status === 'approved' ? 'Deny' : 'Approve'}
                                    </button>

                                    {/* adding extra spaces */}
                                    {
                                        " "
                                    }

                                    {/* Use handleFeedbackModal function when the "Send Feedback" button is clicked */}
                                    <button
                                        onClick={() => handleFeedbackModal(product._id)}
                                        className="btn btn-ghost"
                                    >
                                        Send Feedback
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for feedback */}
            {showModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Send Feedback</h3>
                        <textarea
                            className="block w-full px-4 py-2 mb-4 resize-none border rounded-md"
                            rows="4"
                            placeholder="Write your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSendFeedback()}
                                className="btn-action btn-send-feedback mr-2"
                            >
                                Send
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn-action btn-cancel-feedback"
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

export default ManageProducts;