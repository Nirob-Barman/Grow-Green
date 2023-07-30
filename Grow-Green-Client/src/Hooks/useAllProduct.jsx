import { useQuery } from '@tanstack/react-query';

const useAllProduct = () => {

    const { refetch, data: products = [] } = useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => {
            const res = await fetch(`https://grow-green-server.vercel.app/products/`);
            return res.json();
        },
    });

    return [products, refetch];
};

export default useAllProduct;
