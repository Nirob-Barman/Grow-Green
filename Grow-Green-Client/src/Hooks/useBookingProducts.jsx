import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useBookingProducts = () => {

    const { user, loading } = useAuth();

    console.log("Client Email from booking products: ", user?.email);

    const { refetch, data: bookingProducts = [] } = useQuery({
        queryKey: ['bookingProducts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://grow-green-server.vercel.app/selectedProducts?email=${user.email}`)
            return res.json();
        },
    })

    return [bookingProducts, refetch]
};

export default useBookingProducts;
