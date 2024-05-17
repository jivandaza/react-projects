import cartProductModel from '../../models/cartProductModel.js';

const viewCartToProductsController = async (req, res) => {
    try {
        const { userId } = req;

        const data = await cartProductModel.find({
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

export default viewCartToProductsController;