import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useFetchUsers = () => {
    const { user, loading } = useAuth();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get('https://grow-green-server.vercel.app/users');
            return res.data;
        }
    });

    return { users, refetch };
};

export default useFetchUsers;
