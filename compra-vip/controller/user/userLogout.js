const userLogoutController = async (req, res) => {
    try {
        res.clearCookie('token', {
            expires: new Date(0)
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