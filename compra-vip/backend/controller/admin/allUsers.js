import UserModel from './../../models/userModel.js';

const allUsersController = async (req, res) => {
    try {
        const data = await UserModel.find();

        res.json({
            message : "Usuarios obtenidos...",
            data,
            success : true,
            error : false
        });
    } catch (err) {
        console.error('Error en Obtener Usuarios: ', err.message || err);

        res.status(500).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
        });
    }
}

export default allUsersController;