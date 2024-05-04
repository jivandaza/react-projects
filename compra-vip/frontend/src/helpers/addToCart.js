const addToCart = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    alert('add to cart');
};

export default addToCart;