import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import Home from './../pages/Home';
import Login from './../pages/Login';
import ForgotPassword from './../pages/ForgotPassword';
import SignUp from './../pages/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'acceder',
                element: <Login />
            },
            {
                path: 'recuperar-contraseña',
                element: <ForgotPassword />
            },
            {
                path: 'registrarse',
                element: <SignUp />
            }
        ]
    }
]);

export default router;