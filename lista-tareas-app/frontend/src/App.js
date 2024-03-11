import Navbar from './componentes/navbar/Navbar';
import Inicio from './componentes/inicio/Inicio';
import Acerca from './componentes/acerca/Acerca';
import Footer from './componentes/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Inicio />} />
                    <Route path='/acerca' element={<Acerca />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
