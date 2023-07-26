import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useWishedProducts = () => {
    const { user } = useAuth();

    // console.log("Client Email from wishListedProducts: ", user?.email);

    const { refetch, data: wishListedProducts = [] } = useQuery({
        queryKey: ['wishListedProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectedProducts/${user?.email}`)
            return res.json();
        },
    })

    return [wishListedProducts, refetch]
};

export default useWishedProducts;