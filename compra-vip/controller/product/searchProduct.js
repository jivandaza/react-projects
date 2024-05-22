import ProductModel from './../../models/productModel.js';

const searchProductController = async (req, res) => {
    try {
        const query = req?.query?.q;

        const regex = new RegExp(query, 'i', 'g');

        const data = await ProductModel.find({
           '$or' : [
               {
                   name: regex
               },
               {
                   category: regex
               }
           ]
        });

        return res.json({
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
            data: []
        });
    }
};

export default searchProductController;