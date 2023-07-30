import useAllProduct from '../../../Hooks/useAllProduct';

import productImg from '../../../assets/home/Products/product.avif';
import seedsImg from '../../../assets/home/Products/seeds.avif';
import soilImg from '../../../assets/home/Products/soil.avif';
import packagingImg from '../../../assets/home/Products/packaging.avif';
import plantsImg from '../../../assets/home/Products/plants.avif';
import potsImg from '../../../assets/home/Products/pots.jpg';
import sprinklerImg from '../../../assets/home/Products/sprinkler.avif';
import stonesImg from '../../../assets/home/Products/stones.jpg';
import toolsImg from '../../../assets/home/Products/tools.avif';
import trayImg from '../../../assets/home/Products/tray.jpg';

import ProductCategory from '../ProductCategory/ProductCategory';
import Cover from '../../Shared/Cover/Cover';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useProductCategories from '../../../Hooks/useProductCategories';

const Products = () => {
    const { seeds, soil, tray, tools, pots, stones, sprinkler, plants, packaging, sixRandomDataPoints } = useProductCategories();

    return (
        <div>
            <Cover img={productImg} title="Our Products"></Cover>

            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            <ProductCategory items={sixRandomDataPoints} title="offered" ></ProductCategory>

            <ProductCategory items={seeds} title="seeds" img={seedsImg}></ProductCategory>
            <ProductCategory items={soil} title="soil-fertilizer" img={soilImg}></ProductCategory>
            <ProductCategory items={tray} title="seeding-tray" img={trayImg}></ProductCategory>
            <ProductCategory items={tools} title="tools-accessories" img={toolsImg}></ProductCategory>
            <ProductCategory items={pots} title="pots-containers" img={potsImg}></ProductCategory>
            <ProductCategory items={stones} title="stones-pebbles" img={stonesImg}></ProductCategory>
            <ProductCategory items={sprinkler} title="sprinkler-irrigation" img={sprinklerImg}></ProductCategory>
            <ProductCategory items={plants} title="indoor-plants" img={plantsImg}></ProductCategory>
            <ProductCategory items={packaging} title="packaging-materials" img={packagingImg}></ProductCategory>
        </div>
    );
};

export default Products;