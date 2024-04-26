import ProductModel from './../../models/productModel.js';
import uploadProductPermission from "../../helpers/permission.js";

const uploadProduct = async (req, res) =>{
    try {
        const permission = await uploadProductPermission(req.userId);

        if ( !permission ) {
            throw {
                errClient: true,
                message: 'Permiso denegado...'
            };
        }

        const { name, brand, category, image, description, price, sellingPrice } = req.body;

        if ( !name ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione un nombre'
            };
        }

        if ( !brand ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione una marca'
            };
        }

        if ( !category ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione una categoría'
            };
        }

        if ( image.length === 0 ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione una imagen'
            };
        }

        if ( !price ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione un precio'
            };
        }

        if ( price === '0' ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione un mayor precio'
            };
        }

        if ( !sellingPrice ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione un precio de venta'
            };
        }

        if ( sellingPrice === '0' ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione un mayor precio de venta'
            };
        }

        if ( parseInt(price) < parseInt(sellingPrice) ) {
            throw {
                errClient: true,
                message: 'Por favor, el precio debe ser mayor al precio de venta'
            };
        }

        if ( !description ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione una descripción'
            };
        }

        const product = new ProductModel(req.body);
        const saveProduct = await product.save();

        res.status(201).json({
            message : "Producto guardado...",
            error : false,
            success : true,
            data : saveProduct
        })


    } catch (err) {
        if ( !err.errClient )
            console.error('Error en Subir Producto: ', err.message || err);

        const message = err.errClient ? err.message : 'Se ha producido un error, intenta más tarde';
        res.status(400).json({
            message,
            error: true,
            success: false,
        });
    }
};

export default uploadProduct;