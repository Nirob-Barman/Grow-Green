import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useWishedProducts = () => {
    const { user, loading } = useAuth();

    // console.log("Client Email from wishListedProducts: ", user?.email);

    const { refetch, data: wishListedProducts = [] } = useQuery({
        queryKey: ['wishListedProducts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://grow-green-server.vercel.app/selectedProducts/${user?.email}`)
            return res.json();
        },
    })

    return [wishListedProducts, refetch]
};

export default useWishedProducts;