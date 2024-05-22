const userLogoutController = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/'
        });

        res.json({
            message: 'Cerrando Sesión',
            error: false,
            success: true,
        });
    } catch (err) {
        console.log(err.message || err);

        res.json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false
        });
    }
}

export default userLogoutController;