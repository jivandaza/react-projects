import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import summaryApi from './common/index.js';
import Context from './context/index';
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserDetails = async () => {
        const dataRequest = await fetch(summaryApi.currentUser.url, {
            method: summaryApi.currentUser.method,
            credentials: 'include'
        });

        const { failAuth, error, message, success, data } = await dataRequest.json();

        if ( failAuth ) {
            toastr.info(message);
            setTimeout(() => navigate('/acceder'), 3000);
        }

        if ( error ) {
            toastr.error(message);
            setTimeout(() => navigate('/acceder'), 3000);
        }

        if ( success ) {
            dispatch(setUserDetails(data));
        }
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

        /**     User Details     */
        fetchUserDetails();
    }, []);

    return (
        <>
            <Context.Provider value={{
                fetchUserDetails
            }} >
                <Header />
                <main className='min-h-[calc(100vh-120px)]'>
                    <Outlet />
                </main>
                <Footer />
            </Context.Provider>
        </>
    );
}

export default App;
