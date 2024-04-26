import UserModel from "../models/userModel.js";


const uploadProductPermission = async (userId) => {
    const user = await UserModel.findById(userId);

    return user.role === 'ADMIN';
};

export default uploadProductPermission;