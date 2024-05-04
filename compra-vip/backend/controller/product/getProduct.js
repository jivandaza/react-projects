import ProductModel from "../../models/productModel.js";

const getProduct = async (req, res) => {
    try {
        const { productId } = req?.body;

        const data = await ProductModel.findById(productId);

        res.status(200).json({
            data,
            message: 'OK',
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

export default getProduct;