import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchReviews = () => {
    const { data: reviews, isLoading, error, refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            try {
                const response = await axios.get("https://grow-green-server.vercel.app/reviews");
                return response.data;
            } catch (error) {
                console.error("Error fetching reviews:", error);
                throw new Error("Failed to fetch reviews");
            }
        },
    });

    return { reviews, isLoading, error, refetch };
};

export default useFetchReviews;