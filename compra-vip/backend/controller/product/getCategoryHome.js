import ProductModel from './../../models/productModel.js';

const getCategoryHome = async (req, res) => {
    try {
        const { category } = req?.body || req?.query;
        const data = ProductModel.find({category});

        res.status(201).json({
            data,
            message: 'OK',
            success: true,
            error: false
        })
    } catch (err) {
        console.log(err.message || err);
        res.status(400).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
        });
    }
}

export default getCategoryHome;