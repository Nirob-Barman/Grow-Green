import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useSalesman = () => {
    const { user, loading } = useAuth();
    // console.log('useSalesman hook email:', user?.email);

    // use axios with react query
    const { data: isSalesman, isLoading: isSalesmanLoading } = useQuery({
        // queryKey: ['isSalesman', user?.email],
        // enabled: !loading,
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (user?.email) {
                try {
                    const res = await axios.get(`http://localhost:5000/users/salesman/${user.email}`);
                    console.log('is salesman response', res)
                    return res.data.salesman;
                } catch (error) {
                    console.error("Error fetching salesman status:", error);
                }
            }
            return false;
        }
    });

    return [isSalesman, isSalesmanLoading];
};

export default useSalesman;
