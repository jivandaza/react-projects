import cartProductModel from '../../models/cartProductModel.js';

const countToCartProductController = async (req, res) => {
    try {
        const userId = req?.userId;

        const count = await cartProductModel.countDocuments({
            userId
        });

        return res.json({
            data : {
                count
            },
            message : 'OK',
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

export default countToCartProductController;