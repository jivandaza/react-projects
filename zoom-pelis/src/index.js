import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes';
import {SearchProvider} from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SearchProvider>
            <RouterProvider router={router} />
        </SearchProvider>
    </React.StrictMode>
);