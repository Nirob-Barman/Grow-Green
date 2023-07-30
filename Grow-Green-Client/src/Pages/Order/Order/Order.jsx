import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAllProduct from '../../../Hooks/useAllProduct';
import Cover from '../../Shared/Cover/Cover';
// import orderCoverImg from '../../../assets/home/order.jpg'
// import orderCoverImg from '../../../assets/home/cover.webp'
import orderCoverImg from '../../../assets/home/cover.avif'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderTab from '../OrderTab/OrderTab';
import useProductCategories from '../../../Hooks/useProductCategories';

const Order = () => {

    const categories = [
        "offered",
        "seeds",
        "soil-fertilizer",
        "seeding-tray",
        "tools-accessories",
        "pots-containers",
        "stones-pebbles",
        "sprinkler-irrigation",
        "indoor-plants",
        "packaging-materials",
    ];

    const { category } = useParams();
    // console.log(category);
    const initialIndex = categories.indexOf(category);
    // console.log('Initial Index: ', initialIndex);

    // const [tabIndex, setTabIndex] = useState(0);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    // console.log('Tab Index: ', tabIndex);

    const [products] = useAllProduct();
    // console.log(products);


    const { sixRandomDataPoints } = useProductCategories();
    const offered = Object.values(sixRandomDataPoints).filter(item => item !== null);
    console.log(offered);

    // const offered = products.filter(item => item.category === 'offered');
    const seeds = products.filter(item => item.category === 'seeds');
    const soil = products.filter(item => item.category === 'soil-fertilizer');
    const tray = products.filter(item => item.category === 'seeding-tray');
    const tools = products.filter(item => item.category === 'tools-accessories');
    const pots = products.filter(item => item.category === 'pots-containers');
    const stones = products.filter(item => item.category === 'stones-pebbles');
    const sprinkler = products.filter(item => item.category === 'sprinkler-irrigation');
    const plants = products.filter(item => item.category === 'indoor-plants');
    const packaging = products.filter(item => item.category === 'packaging-materials');

    const formatCategoryLabel = [
        "Today's Offer",
        "Seeds",
        "Soil & Fertilizer",
        "Seeding tray",
        "Tools & Accessories",
        "Pots & Containers",
        "Stones Pebbles",
        "Sprinkler & Irrigation",
        "Indoor Plants",
        "Packaging Materials",
    ];

    return (
        <div className='pt-28'>
            <Cover img={orderCoverImg} title="Order Products"></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => { setTabIndex(index) }}>
                <TabList>
                    {formatCategoryLabel.map((category) => (
                        <Tab key={category}>{category}</Tab>
                    ))}
                </TabList>

                <TabPanel>
                    <OrderTab items={offered}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={seeds}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soil}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={tray}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={tools}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pots}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={stones}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={sprinkler}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={plants}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={packaging}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;