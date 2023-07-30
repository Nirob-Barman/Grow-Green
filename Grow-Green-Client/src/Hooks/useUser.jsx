import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useUser = () => {
    const { user, loading } = useAuth();

    // use axios with react query
    const { data: isUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['isUser', user?.email],
        enabled: !loading,
        queryFn: async () => {
            if (user?.email) {
                try {
                    const res = await axios.get(`https://grow-green-server.vercel.app/users/user/${user.email}`);
                    // console.log('is user response', res)
                    return res.data.user;
                } catch (error) {
                    console.error("Error fetching user status:", error);
                }
            }
            return false;
        }
    });

    return [isUser, isUserLoading];
};

export default useUser;
