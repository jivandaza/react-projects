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
    }
}

export default summaryApi;