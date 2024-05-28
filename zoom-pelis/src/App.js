import './App.css';
import { useEffect, useState, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieoSlice';
import { routeNavigation } from './common/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';
import Context from './context/index';
import axios from 'axios';

function App() {

    const location = useLocation();

    // Obténgo el último segmento de la ruta
    const currentPath = location.pathname.split('/').filter(Boolean).pop();

    // Comparo el ultímo segmento de la ruta con las rutas de navegación
    const routeExists = routeNavigation.some(item => item.href === currentPath || !currentPath);

    const dispatch = useDispatch();

    const [routerDetails, setRouterDetails] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const fetchTrendingData = async ()=> {
        try {
            setIsLoading(true);

            const response = await axios.get('/trending/all/week');

            const { results } = response.data;

            //console.log(results);

            dispatch(setBannerData(results));

            setIsLoading(false);
        } catch (error) {
            console.error(error.message || error);
        }
    };

    const fetchConfiguration = async()=>{
        try {
            setIsLoading(true);

            const response = await axios.get('/configuration');

            const { images } = response.data;

            //console.log(images);

            dispatch(setImageURL(images.secure_base_url+'original'));

            setIsLoading(false);
        } catch (error) {
            console.error(error.message || error);
        }
    };

    useEffect(()=>{
        fetchTrendingData();
        fetchConfiguration();
    },[]);

    return (
        routeExists || routerDetails ? (
            <Context.Provider value={{
                isLoading,
                setRouterDetails
            }} >
                <main className='pb-14 lg:pb-0'>
                    <Header />
                    <div className='min-h-[90vh]'>
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </Context.Provider>
        ) : (
            <NotFoundPage />
        )
    );
}

export default App;
