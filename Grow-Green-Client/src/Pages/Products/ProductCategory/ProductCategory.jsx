import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import Cover from '../../Shared/Cover/Cover';

const ProductCategory = ({ items, title, img }) => {
    return (
        <div>
            <div className='pt-8'>
                {title && img && <Cover img={img} title={title}></Cover>}

                {
                    title === 'offered' && <>
                        <div className='uppercase text-center'>
                            {/* <p className="text-yellow-600 mb-2">--- 10% discount on each product ---</p> */}
                            <p className="text-3xl uppercase  py-4">--- 10% discount on each product ---</p>
                        </div>
                    </>
                }

                <div className="grid md:grid-cols-2 gap-10 my-16">
                    {
                        items.map(item => <ProductItem
                            key={item._id}
                            item={item}
                        ></ProductItem>)
                    }
                </div>

                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCategory;