import CartProductModel from '../../models/cartProductModel.js';

const updateProductToCartController = async (req, res) => {
    try {
        const { cartId } = req?.body;
        const qty = req?.body?.quantity;

        await CartProductModel.updateOne({_id : cartId}, {
            ...(qty && {quantity: qty})
        });

        return res.json({
            message: 'Producto actualizado en el carrito...',
            success: true,
            error: false
        });
    } catch(err) {
        console.log(err.message || err);

        res.status(400).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
        });
    }
};

export default updateProductToCartController;