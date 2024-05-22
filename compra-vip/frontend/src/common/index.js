const backendDomain = window.location.origin;

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
    },
    searchProduct: {
        url: `${backendDomain}/api/producto/buscar`,
        method: 'get'
    },
    filterProductsByCategory: {
        url: `${backendDomain}/api/producto/filtrar`,
        method: 'post'
    },
    addProductToCart: {
        url: `${backendDomain}/api/carrito/agregar`,
        method: 'post'
    },
    countProductsToCart: {
        url: `${backendDomain}/api/carrito/contar`,
        method: 'get'
    },
    viewProductsOfCart: {
        url: `${backendDomain}/api/carrito/datos`,
        method: 'get'
    },
    updateProductToCart: {
        url: `${backendDomain}/api/carrito/actualizar`,
        method: 'post'
    },
    deleteProductToCart: {
        url: `${backendDomain}/api/carrito/eliminar`,
        method: 'post'
    }
}

export default summaryApi;