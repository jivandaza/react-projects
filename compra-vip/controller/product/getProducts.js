import ProductModel from './../../models/productModel.js';

const getProducts = async (req, res) => {
    try {
        const data = await ProductModel.find().sort({createdAt: -1});

        return res.status(201).json({
            message: 'OK',
            error: false,
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
            data: []
        });
    }
};

export default getProducts;