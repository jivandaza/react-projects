import UserModel from './../../models/userModel.js';

const userDetailsController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "Detalles del usuario..."
        });
    } catch (err) {
        console.error('Error en Detalles de Usuario: ', err.message || err);
        res.clearCookie('token');

        res.status(500).json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false,
            data: []
        });
    }
}

export default userDetailsController;