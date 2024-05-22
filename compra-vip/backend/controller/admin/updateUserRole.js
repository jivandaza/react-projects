import UserModel from './../../models/userModel.js';

const updateUserRoleController = async (req, res) => {
    try {
        const { userId, email, name, role } = req.body;

        const payload = {
            ...(email && {email: email}),
            ...(name && {name: name}),
            ...(role && {role: role}),
        };

        await UserModel.findByIdAndUpdate(userId, payload);

        res.json({
            message: 'Rol Actualizado',
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
};

export default updateUserRoleController;