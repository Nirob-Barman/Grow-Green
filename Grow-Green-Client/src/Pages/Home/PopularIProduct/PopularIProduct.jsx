import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ProductItem from '../../Products/ProductItem/ProductItem';
import useProductCategories from '../../../Hooks/useProductCategories';

const PopularIProduct = () => {

    const { popularCategories } = useProductCategories();
    const popularItems = Object.values(popularCategories).filter(item => item !== null);

    return (
        <div>
            <section className="mb-12">
                <SectionTitle
                    heading="From Our Product"
                    subHeading="Popular Items"
                ></SectionTitle>

                <div className="grid md:grid-cols-2 gap-10">
                    {
                        popularItems.map(item => <ProductItem
                            key={item._id}
                            item={item}
                        ></ProductItem>)
                    }
                </div>

                <div className="flex justify-center">
                    <button className="btn btn-outline border-0 border-b-4 mt-4">
                        View All Products
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PopularIProduct;