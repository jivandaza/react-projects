import UserModel from './../../models/userModel.js';
import bcrypt from 'bcryptjs';

async function userSignUpController(req, res) {
    try {
        const { name, email, password } = req.body;

        if ( !name ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione su nombre'
            };
        }
        if ( !email ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione su correo electrónico'
            };
        }
        if ( !password ) {
            throw {
                errClient: true,
                message: 'Por favor, proporcione su contraseña'
            };
        }

        const user = await UserModel.findOne({email});

        if ( user ) {
             return res.status(201).json({
                existUser: true,
                success: false,
                error: true,
                message: 'El correo electrónico se encuentra registrado'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if ( !hashPassword ) {
            throw {
                errClient: true,
                message: 'Algo salió mal, inténtalo más tarde'
            };
        }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        }

        const userData = new UserModel(payload);
        const saveUser = await userData.save();

        return res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: 'Registrado exitosamente'
        });
    } catch (err) {
        const message = err.errClient ? err.message : 'Se ha producido un error, intenta más tarde';
        const sendStatus = err.errClient ? 400 : 500;
        res.status(sendStatus).json({
            message: message,
            error: true,
            success: false
        });
    }
}

export default userSignUpController;