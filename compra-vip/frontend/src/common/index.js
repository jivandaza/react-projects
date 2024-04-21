const backendDomain = 'http://localhost:3001';

const summaryApi = {
    signUp: {
        url: `${backendDomain}/api/usuario/registrar`,
        method: 'post'
    }
}

export default summaryApi;