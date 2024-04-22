const userLogoutController = async (req, res) => {
    try {
        res.clearCookie('token');

        res.json({
            message: 'Cerrando sesión...',
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        console.error('Error en Cerrar Sesión: ', err.message || err);

        res.json({
            message: 'Se ha producido un error, intenta más tarde',
            error: true,
            success: false
        });
    }
}

export default userLogoutController;