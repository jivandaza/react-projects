import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Booking from './pages/Booking';
import UserBookings from './pages/UserBookings';
import AdminHome from './pages/AdminHome';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
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
                    <Route path='/mybookings' exact element={isAuthenticated ? <UserBookings /> : <Navigate to="/login" />} />
                    <Route path='/admin' exact element={isAuthenticated ? <AdminHome /> : <Navigate to="/login" />} />
                    <Route path='/addcar' exact element={isAuthenticated ? <AddCar /> : <Navigate to="/login" />} />
                    <Route path='/editcar/:carid' exact element={isAuthenticated ? <EditCar /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

export function isAuthenticated() {
    return !!localStorage.getItem('user');
}