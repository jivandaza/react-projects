import 'moment/locale/es';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SearchProvider } from "./context/SearchContext";
import { store } from './store/store';
import router from './routes';
import moment from 'moment';
import axios from 'axios';

/**     configuración moment para usar español     **/
moment.locale('es');

/**     configuración axios     **/
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <SearchProvider>
                <RouterProvider router={router} />
            </SearchProvider>
        </Provider>
    </React.StrictMode>
);