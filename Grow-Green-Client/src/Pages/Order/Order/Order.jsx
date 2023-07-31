import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cover from '../../Shared/Cover/Cover';
import orderCoverImg from '../../../assets/home/cover.avif'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderTab from '../OrderTab/OrderTab';
import useProductCategories from '../../../Hooks/useProductCategories';
import { Helmet } from 'react-helmet-async';

const Order = () => {

    const categories = ["offered", "seeds", "soil-fertilizer", "seeding-tray", "tools-accessories", "pots-containers", "stones-pebbles", "sprinkler-irrigation", "indoor-plants", "packaging-materials"];

    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const { seeds, soil, tray, tools, pots, stones, sprinkler, plants, packaging, sixRandomDataPoints } = useProductCategories();

    const offered = Object.values(sixRandomDataPoints).filter(item => item !== null);



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


    // Update the URL parameter whenever the tabIndex changes
    useEffect(() => {
        const selectedCategory = categories[tabIndex];
        // Update the URL with the selected category
        window.history.replaceState(null, null, `/order/${selectedCategory}`);
    });


    return (
        <div className='pt-28'>

            <Helmet>
                <title>{`${formatCategoryLabel[tabIndex]}`}</title>
            </Helmet>

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