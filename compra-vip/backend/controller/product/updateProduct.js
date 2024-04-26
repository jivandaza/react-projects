import uploadProductPermission from "../../helpers/permission.js";
import ProductModel from "../../models/productModel.js";

const updateProduct = async (req, res) => {
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

        const { _id, ...resBody } = req.body;

        const updateProduct = await ProductModel.findByIdAndUpdate(_id, resBody);

        res.status(200).json({
            message: 'Se han guardado los cambios...',
            success: true,
            error: false
        });
    } catch (err) {
        if ( !err.errClient )
            console.error('Error en Editar Producto: ', err.message || err);

        const message = err.errClient ? err.message : 'Se ha producido un error, intenta más tarde';
        res.status(400).json({
            message,
            error: true,
            success: false,
        });
    }
};

export default updateProduct;