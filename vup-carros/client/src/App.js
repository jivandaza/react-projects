import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Booking from './pages/Booking';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path='/register' exact element={isAuthenticated ? <Register /> : <Navigate to="/" />} />
                    <Route path='/login' exact element={isAuthenticated ? <Login /> : <Navigate to="/" />} />
                    <Route path='/booking/:carid' exact element={isAuthenticated ? <Booking /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

export function ProtectedRoute({ element, ...rest }) {
    const isAuthenticated = !!localStorage.getItem('user');
    return isAuthenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
}

export function isAuthenticated() {
    return !!localStorage.getItem('user');
}