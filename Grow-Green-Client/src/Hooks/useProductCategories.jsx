import { useEffect, useMemo, useState } from 'react';
import useAllProduct from './useAllProduct';

// Add descriptions for each category
const seedsDescription = "Explore a wide selection of high-quality seeds for a variety of plants and start your gardening journey.";
const soilDescription = "Nourish your plants with nutrient-rich soil, ensuring healthy growth and flourishing gardens.";
const trayDescription = "Get durable seeding trays designed for efficient germination and successful seedlings.";
const toolsDescription = "Maintain your garden effortlessly with essential garden tools to enhance your gardening experience.";
const potsDescription = "Display your plants in stylish plant pots and containers, adding charm to your indoor and outdoor spaces.";
const stonesDescription = "Create stunning landscapes with decorative stones, adding natural beauty to your garden design.";
const sprinklerDescription = "Keep your garden green with efficient water sprinklers and irrigation systems for optimal plant health.";
const plantsDescription = "Embrace the beauty of indoor plants, perfect for home decor and creating a refreshing ambiance.";
const packagingDescription = "Ensure product safety and appeal with quality materials for reliable and attractive product packaging.";
const offeredDescription = "Discover special deals and offers tailored for you, bringing joy to your gardening shopping.";

// Function to select a random item from an array
function selectRandomItem(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Function to apply a 10% discount to the price
function applyDiscount(price) {
    return (price * 0.9).toFixed(2);
}

// Custom hook to get the product categories
function useProductCategories() {
    const [products] = useAllProduct();

    // Categorize the products
    const seeds = useMemo(() => products.filter(item => item.category === 'seeds'), [products]);
    const soil = useMemo(() => products.filter(item => item.category === 'soil-fertilizer'), [products]);
    const tray = useMemo(() => products.filter(item => item.category === 'seeding-tray'), [products]);
    const tools = useMemo(() => products.filter(item => item.category === 'tools-accessories'), [products]);
    const pots = useMemo(() => products.filter(item => item.category === 'pots-containers'), [products]);
    const stones = useMemo(() => products.filter(item => item.category === 'stones-pebbles'), [products]);
    const sprinkler = useMemo(() => products.filter(item => item.category === 'sprinkler-irrigation'), [products]);
    const plants = useMemo(() => products.filter(item => item.category === 'indoor-plants'), [products]);
    const packaging = useMemo(() => products.filter(item => item.category === 'packaging-materials'), [products]);

    const categories = { seeds, soil, tray, tools, pots, stones, sprinkler, plants, packaging };
    // Function to get at least one item from each category
    function getAtLeastOneFromEachCategory() {
        const result = [];
        for (const category in categories) {
            const randomItem = selectRandomItem(categories[category]);
            if (randomItem) {
                // Apply discount to the price
                randomItem.price = applyDiscount(randomItem.price);
                result.push(randomItem);
            }
        }
        return result;
    }

    // Function to create offered items array with at least one item from each category
    function createOfferedItemsArray() {
        const atLeastOneFromEachCategory = getAtLeastOneFromEachCategory();
        const remainingItemsNeeded = 6 - atLeastOneFromEachCategory.length;
        const otherCategories = Object.keys(categories).filter(category => !atLeastOneFromEachCategory.some(item => item.category === category));
        for (let i = 0; i < remainingItemsNeeded; i++) {
            const randomCategory = selectRandomItem(otherCategories);
            if (randomCategory) {
                const randomItem = selectRandomItem(categories[randomCategory]);
                if (randomItem) {
                    // Apply discount to the price
                    randomItem.price = applyDiscount(randomItem.price);
                    atLeastOneFromEachCategory.push(randomItem);
                }
            }
        }
        return atLeastOneFromEachCategory;
    }

    // Function to get a slice of 6 data points from the offered items array
    function getSixRandomDataPoints() {
        const offeredItemsArray = createOfferedItemsArray();
        const slicedData = offeredItemsArray.slice(0, 6);
        return slicedData;
    }

    function getPopularCategories() {
        return {
            seeds: selectRandomItem(seeds),
            soil: selectRandomItem(soil),
            tray: selectRandomItem(tray),
            tools: selectRandomItem(tools),
            pots: selectRandomItem(pots),
            stones: selectRandomItem(stones),
            sprinkler: selectRandomItem(sprinkler),
            plants: selectRandomItem(plants),
            packaging: selectRandomItem(packaging),
        };
    }

    const [popularCategories, setPopularCategories] = useState(getPopularCategories());

    // Update `sixRandomDataPoints` every 24 hours
    useEffect(() => {
        const intervalId = setInterval(() => {
            setPopularCategories(getPopularCategories());
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

        return () => clearInterval(intervalId);
    }, []);

    return {
        categories,
        seeds,
        soil,
        tray,
        tools,
        pots,
        stones,
        sprinkler,
        plants,
        packaging,
        sixRandomDataPoints: getSixRandomDataPoints(),
        popularCategories,

        seedsDescription,
        soilDescription,
        trayDescription,
        toolsDescription,
        potsDescription,
        stonesDescription,
        sprinklerDescription,
        plantsDescription,
        packagingDescription,
        offeredDescription,
    };
}

export default useProductCategories;
