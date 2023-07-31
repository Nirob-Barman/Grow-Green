import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularIProduct from "../PopularIProduct/PopularIProduct";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Grow Green | Home</title>
            </Helmet>
            <Banner />
            <Category />
            <PopularIProduct />
            <Testimonials />
        </div>
    );
};

export default Home;