import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Header from './components/Header';
import Footer from './components/Footer';
import toastr from 'toastr';
import summaryApi from './common/index.js';
import Context from './context/index';
import 'toastr/build/toastr.min.css';
import './App.css';

function App() {

    const [countProductsOfCart, setCountProductsOfCart] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserData = async () => {
        const response = await fetch(summaryApi.currentUser.url, {
            method: summaryApi.currentUser.method,
            credentials: 'include'
        });

        const { failAuth, error, message, success, data } = await response.json();

        if ( failAuth || error ) {
            dispatch(setUserDetails(null));
            navigate('/');
        }

        if ( success )
            dispatch(setUserDetails(data));
    };

    const fetchCountProductsToCart = async () => {
        const response = await fetch(summaryApi.countProductsToCart.url, {
            method: summaryApi.countProductsToCart.method,
            credentials: 'include'
        });

        const { data, success } = await response.json();

        if ( success )
            setCountProductsOfCart(data?.count);
    };

    useEffect(() => {
        /**     Toastr Options     */
        toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-left',
            preventDuplicates: true,
            timeOut: 3000
        };

        /**     User Details        */
        fetchUserData();
        /**     Count Cart Product  */
        fetchCountProductsToCart();
    }, []);

    return (
        <>
            <Context.Provider value={{
                fetchUserData,
                countProductsOfCart,
                fetchCountProductsToCart
            }} >
                <Header />

                <main className='min-h-[calc(100vh-120px)] pt-16'>
                    <Outlet />
                </main>

                <Footer />
            </Context.Provider>
        </>
    );
}

export default App;
