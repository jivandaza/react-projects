const userLogoutController = async (req, res) => {
    try {
        res.clearCookie('token');

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