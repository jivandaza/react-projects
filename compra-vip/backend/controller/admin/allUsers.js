import UserModel from './../../models/userModel.js';

const allUsersController = async (req, res) => {
    try {
        const data = await UserModel.find();

        res.json({
            message : "OK",
            data,
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
}

export default allUsersController;