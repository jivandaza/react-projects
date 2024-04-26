import ProductModel from './../../models/productModel.js';

const getProducts = async (req, res) => {
    try {
        const dataAllProducts = await ProductModel.find().sort({createdAt: -1});

        res.status(201).json({
            message: 'Lista de productos...',
            error: false,
            success: true,
            data: dataAllProducts
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