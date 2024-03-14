import Navbar from './componentes/navbar/Navbar';
import Inicio from './componentes/inicio/Inicio';
import Acerca from './componentes/acerca/Acerca';
import Registrarse from './componentes/registrarse/Registrarse';
import Acceso from './componentes/acceso/Acceso';
import Tarea from './componentes/tarea/Tarea';
import Footer from './componentes/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index";
import './App.css';
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const id = sessionStorage.getItem('id');
        if ( id ) {
            dispatch(authActions.login());
        }
    }, []);
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Inicio />} />
                    <Route path='/acerca' element={<Acerca />} />
                    <Route path='/tareas' element={<Tarea />} />
                    <Route path='/registrarse' element={<Registrarse />} />
                    <Route path='/acceso' element={<Acceso />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
