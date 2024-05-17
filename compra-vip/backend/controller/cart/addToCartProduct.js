import cartProductModel from '../../models/cartProductModel.js';

const addToCartProductController = async (req, res) => {
    try {
        const   { productId }     = req?.body;
        const   currentUser       = req?.userId;

        const isProductAvailable = await cartProductModel.findOne({ productId });

        if( isProductAvailable ){
            return res.json({
                message : 'Ya existe en añadir al carrito',
                success : false,
                error : true
            });
        }

        const payload  = {
            productId,
            quantity : 1,
            userId : currentUser,
        };

        const addToCartProduct = new cartProductModel(payload);

        await addToCartProduct.save();

        return res.json({
            message : 'Producto añadido al carrito',
            success : true,
            error : false
        });
    } catch (err) {
        console.log(err.message || err);

        res.status(400).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
        });
    }
};

export default addToCartProductController;