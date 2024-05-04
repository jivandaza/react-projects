const backendDomain = 'http://localhost:3001';

const summaryApi = {
    signUp: {
        url: `${backendDomain}/api/usuario/registrar`,
        method: 'post'
    },
    signIn: {
        url: `${backendDomain}/api/usuario/acceso`,
        method: 'post'
    },
    currentUser: {
        url: `${backendDomain}/api/usuario/datos`,
        method: 'get'
    },
    logout: {
        url: `${backendDomain}/api/usuario/salir`,
        method: 'get'
    },
    allUsers: {
        url: `${backendDomain}/api/admin/usuarios`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/admin/actualizar-usuario`,
        method: 'put'
    },
    uploadProduct: {
        url: `${backendDomain}/api/producto/subir`,
        method: 'post'
    },
    allProducts: {
        url: `${backendDomain}/api/producto/lista`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomain}/api/producto/editar`,
        method: 'put'
    },
    categoryProduct: {
        url: `${backendDomain}/api/producto/categorias`,
        method: 'get'
    },
    productsByCategory: {
        url: `${backendDomain}/api/producto/productos-categoria`,
        method: 'post'
    },
    selectedProduct: {
        url: `${backendDomain}/api/producto/datos`,
        method: 'post'
    }
}

export default summaryApi;