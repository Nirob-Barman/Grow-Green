
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import useWishedProducts from '../../../Hooks/useWishedProducts';

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [wishListedProducts] = useWishedProducts();
    const total = wishListedProducts.reduce((sum, item) => sum + parseFloat(item.price), 0);
    // console.log(total);
    const price = total.toFixed(2)
    // console.log(price);

    return (
        <div>
            {/* <SectionTitle subHeading="please process" heading="Payment"></SectionTitle> */}
            <h2 className="text-3xl">Total: {price}</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm wishListedProducts={wishListedProducts} price={price} />
            </Elements>
        </div>
    );
};

export default Payment;