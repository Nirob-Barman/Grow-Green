import useWishedProducts from '../../../../../Hooks/useWishedProducts';
import { Link } from 'react-router-dom';

const CheckOut = () => {
    const [wishListedProducts, refetch] = useWishedProducts();

    const total = wishListedProducts.reduce((sum, item) => sum + parseFloat(item.price), 0);
    // console.log(total);
    const price = total.toFixed(2)
    return (
        <div>
            {
                wishListedProducts.length > 0 ? <>
                    <h2 className="text-3xl font-bold mb-4">My Products</h2>

                    <p>Wanna CheckOut</p>

                    <div className="my-2">
                        <Link to='/dashboard/payment'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => {
                                    // Implement the logic to handle payment for the selected product

                                }}
                            >
                                Pay: ${price}
                            </button>
                        </Link>
                    </div>

                </> : <h2 className="text-3xl font-bold mb-4">No Products are in the Cart</h2>
            }
        </div>
    );
};

export default CheckOut;