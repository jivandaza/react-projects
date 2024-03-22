import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BookingCar from './pages/BookingCar';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<ProtectedRoute />} >
                        <Route path='/' exact element={<Home />} />
                    </Route>
                    <Route path='/register' exact element={<Register />} />
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/bookingCar' exact element={<BookingCar />} />
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