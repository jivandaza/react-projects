import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import Home from './../pages/Home';
import Login from './../pages/Login';
import ForgotPassword from './../pages/ForgotPassword';
import SignUp from './../pages/SignUp';
import AdminPanel from './../pages/AdminPanel';
import AllUsers from './../pages/AllUsers';
import AllProducts from './../pages/AllProducts';

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
            },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'users',
                        element: <AllUsers />
                    },
                    {
                        path: 'products',
                        element: <AllProducts />
                    }
                ]
            }
        ]
    }
]);

export default router;