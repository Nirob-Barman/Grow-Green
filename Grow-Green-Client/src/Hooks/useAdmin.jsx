import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth();

    // use axios with react query
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            if (user?.email) {
                try {
                    const res = await axios.get(`https://grow-green-server.vercel.app/users/admin/${user.email}`);
                    // console.log('is admin response', res)
                    return res.data.admin;
                } catch (error) {
                    console.error("Error fetching admin status:", error);
                }
            }
            return false;
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
