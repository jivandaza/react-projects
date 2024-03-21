import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BookingCar from './pages/BookingCar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/register' exact element={<Register />} />
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/bookingCar' exact element={<BookingCar />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
