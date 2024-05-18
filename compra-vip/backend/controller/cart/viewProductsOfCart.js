import CartProductModel from '../../models/cartProductModel.js';

const viewProductsOfCartController = async (req, res) => {
    try {
        const { userId } = req;

        const data = await CartProductModel.find({
            userId
        }).populate("productId");

        return res.json({
            data,
            success: true,
            error: false
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

export default viewProductsOfCartController;