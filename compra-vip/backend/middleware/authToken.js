import jwt from 'jsonwebtoken';

const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if ( !token ) {
            throw {
                failAuth: true
            };
        }

         jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded){
             if( err ){
                 console.log("Error auth: ", err);
             }

             req.userId = decoded?._id;

             next();
        });
    } catch (err) {
        const message = err.failAuth ? 'Por favor, inicie sesión...' : 'Se ha producido un error, intenta más tarde';
        const status = err.failAuth ? 200 : 500;

        if ( !err.failAuth ) {
            console.error('Error en Autenticación: ', err.message || err);
            res.clearCookie('token');
        }

        res.status(status).json({
            message,
            failAuth : err.failAuth,
            error: true,
            success: false,
            data: []
        });
    }
}

export default authToken;