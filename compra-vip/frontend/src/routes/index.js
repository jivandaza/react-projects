import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import Home from './../pages/Home';
import Login from './../pages/Login';
import ForgotPassword from './../pages/ForgotPassword';
import SignUp from './../pages/SignUp';
import AdminPanel from './../pages/AdminPanel';
import AllUsers from './../pages/AllUsers';
import AllProducts from './../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from "../pages/Cart";

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
                path: 'producto-categoria/:category',
                element: <CategoryProduct />
            },
            {
                path: 'producto/:id',
                element: <ProductDetails />
            },
            {
                path: 'carrito',
                element: <Cart />
            },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'usuarios',
                        element: <AllUsers />
                    },
                    {
                        path: 'productos',
                        element: <AllProducts />
                    }
                ]
            }
        ]
    }
]);

export default router;