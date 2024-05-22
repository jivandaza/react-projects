import CartProductModel from '../../models/cartProductModel.js';

const deleteProductToCartController  = async (req, res) => {
    try {
        const { cartId } = req?.body;

        await CartProductModel.deleteOne({_id: cartId});

        return res.json({
            message : "Producto eliminado del carrito...",
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

export default deleteProductToCartController;