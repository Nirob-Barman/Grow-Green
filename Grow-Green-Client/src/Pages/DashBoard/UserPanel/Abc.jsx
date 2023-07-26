import React from 'react';
import useWishedProducts from '../../../Hooks/useWishedProducts';

const Abc = () => {
    const [wishListedProducts] = useWishedProducts();
    console.log(wishListedProducts);

    return (
        <div>
            abc
        </div>
    );
};

export default Abc;