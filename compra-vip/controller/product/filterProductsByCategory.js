import ProductModel from './../../models/productModel.js';

const filterProductsByCategoryController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        const data = await ProductModel.find({
            category :  {
                "$in" : categoryList
            }
        });

        return res.json({
            data,
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
            data: []
        });
    }
};

export default filterProductsByCategoryController;