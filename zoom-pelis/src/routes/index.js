import { createBrowserRouter } from 'react-router-dom';
import App  from '../App';
import Home from '../pages/Home';
import ExplorePage from '../pages/ExplorePage';
import DetailsPage from '../pages/DetailsPage';
import SearchPage from '../pages/SearchPage';
import NotFoundPage from '../pages/NotFoundPage';

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
                path: ':explorar',
                element: <ExplorePage />
            },
            {
                path: ':explorar/:id',
                element: <DetailsPage />
            },
            {
                path: 'buscar',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]);

export default router;