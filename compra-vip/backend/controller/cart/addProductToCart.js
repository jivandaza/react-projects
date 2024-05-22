import CartProductModel from '../../models/cartProductModel.js';

const addProductToCartController = async (req, res) => {
    try {
        const   { productId }     = req?.body;
        const   currentUser       = req?.userId;

        const isProductAvailable = await CartProductModel.findOne({ productId });

        if( isProductAvailable ){
            return res.json({
                message : 'Producto existe en el carrito',
                success : false,
                error : true
            });
        }

        const payload  = {
            productId,
            quantity : 1,
            userId : currentUser,
        };

        const addToCartProduct = new CartProductModel(payload);

        await addToCartProduct.save();

        return res.json({
            message : 'Agregado al Carrito',
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

export default addProductToCartController;