import ProductModel from './../../models/productModel.js';

const getCategory = async (req, res) => {
    try {
        const categories = await ProductModel.distinct("category");

        const productByCategory = [];

        for (const category of categories) {
            const product = await ProductModel.findOne({category});

            if ( product ) {
                productByCategory.push(product);
            }
        }

        res.status(200).json({
            message: 'OK',
            data: productByCategory,
            error: false,
            success: true
        })
    } catch (err) {
        console.log(err.message || err);
        res.status(400).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
        });
    }
};

export default getCategory;