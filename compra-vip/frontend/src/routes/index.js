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
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import PageNotFound from '../pages/PageNotFound';
import UserAuthProtected from '../components/auth/UserAuthProtected';

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
                element: (
                    <UserAuthProtected>
                        <Login />
                    </UserAuthProtected>
                )
            },
            {
                path: 'recuperar-contraseña',
                element: (
                    <UserAuthProtected>
                        <ForgotPassword />
                    </UserAuthProtected>
                )
            },
            {
                path: 'registrarse',
                element: (
                    <UserAuthProtected>
                        <SignUp />
                    </UserAuthProtected>
                )
            },
            {
                path: 'producto-categoria',
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
                path: 'buscar',
                element: <SearchProduct />
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
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
]);

export default router;