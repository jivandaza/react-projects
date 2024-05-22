import UserModel from './../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;

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

        if ( !user ) {
            throw {
                failLogin: true,
            };
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if ( checkPassword ) {
            const tokenData = {
                _id: user._id,
                email: user.email
            };

            const token = await jwt.sign(
                tokenData,
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: 60 * 60 * 8 }
            );

            const cookieOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie('token', token, cookieOption).status(201).json({
                data: token,
                success: true,
                error: false,
                message: 'Iniciando Sesión'
            });
        } else {
            throw {
                failLogin: true,
            };
        }
    } catch (err) {
        const message = err.errClient ? err.message : err.failLogin ?
            'El correo electrónico o la contraseña es incorrecto' : 'Se ha producido un error, intenta más tarde';
        const status = err.errClient ? 400 : err.failLogin ? 201 : 500;
        res.status(status).json({
            failLogin: err.failLogin ? err.failLogin : false,
            message: message,
            error: true,
            success: false
        });
    }
}

export default userSignInController;