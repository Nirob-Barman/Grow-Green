const ProductItem = ({ item }) => {
    const { productName, productImage, price, availableProducts } = item;

    return (
        <div className="product-item flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
            <div className="product-image-container flex-shrink-0">
                <img
                    style={{ borderRadius: '0 200px 200px 200px' }}
                    className="w-[100px]"
                    src={productImage}
                    alt={productName}
                />
            </div>
            <div className="product-details">
                <h3 className="product-name">{productName}</h3>
                <p className="product-price">${price}</p>
                <p className="available-products">Available: {availableProducts}</p>
            </div>
        </div>
    );
};

export default ProductItem;
