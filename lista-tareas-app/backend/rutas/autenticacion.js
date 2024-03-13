import express from 'express';
import Usuario from './../modelos/usuario.js';
import bcrypt from 'bcryptjs';

const ruta = express.Router();

// REGISTRARSE
ruta.post('/registrar', async (req, res) => {
    const err = true;
    try {
        const { correo, nombreUsuario, contrasenia } = req.body;
        const war = true;

        if ( !correo ) {
            return res.status(400).json({
               message: 'El correo electrónico no se ingreso',
               err
            });

        } else if ( !nombreUsuario ) {
            return res.status(400).json({
                message: 'El nombre de usuario no se ingreso',
                err
            });

        } else if ( !contrasenia ) {
            return res.status(400).json({
                message: 'La contraseña no se ingreso',
                err
            });
        }

        const existeCorreo = await Usuario.findOne({ correo: correo });

        if ( existeCorreo ) {
            return res.status(400).json({
                message: 'El correo electrónico ya esta registrado',
                war
            });
        }

        const existeNombre = await Usuario.findOne({ nombreUsuario: nombreUsuario });

        if ( existeNombre ) {
            return res.status(400).json({
                message: 'El nombre de usuario ya esta registrado',
                war
            });
        }

        const hashContrasenia = bcrypt.hashSync(contrasenia);
        const usuario = new Usuario({ correo, nombreUsuario, contrasenia: hashContrasenia });

        await usuario.save()
            .then(() => {
                res.status(200).json({
                    message: 'Registrado exitosamente!'
                });
            });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Ocurrió un error al registrarse',
            err
        });
    }
});

// INICIAR SESIÓN
ruta.post('/acceso', async (req, res) => {
    try {
        const { correoFrm, contraseniaFrm } = req.body;

        if ( !correoFrm ) {
            return res.status(400).json({
                message: 'El correo electrónico esta vació'
            });
        } else if ( !contraseniaFrm ) {
            return res.status(400).json({
                message: 'La contraseña esta vacía'
            });
        }

        const usuario = await Usuario.findOne({ correo: correoFrm });

        if ( !usuario ) {
            return res.status(400).json({
               message: 'Por favor, regístrate primero'
            });
        }

        const esContraseniaCorrecta = bcrypt.compareSync(
            contraseniaFrm,
            usuario.contrasenia
        );

        if ( !esContraseniaCorrecta ) {
            return res.status(400).json({
                message: 'La contraseña no es correcta'
            });
        }

        const { contrasenia, ...others } = usuario._doc;
        return res.status(200).json({others});
    } catch (err) {
        console.error(err);

        return res.status(400).json({
            message: 'Ocurrió un error al acceder'
        });
    }
});

export default ruta;