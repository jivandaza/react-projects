import UserModel from './../../models/userModel.js';

const userDetailsController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : 'OK'
        });
    } catch (err) {
        console.log(err.message || err);

        res.status(400).json({
            message : 'Se ha producido un error, intenta más tarde',
            error : true,
            success : false,
            data : null
        });
    }
}

export default userDetailsController;