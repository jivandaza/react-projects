import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Importa los estilos de Toastr
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

    useEffect(() => {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-left',
            preventDuplicates: true,
            timeOut: 3000
        };

    }, []);

    return (
        <>
            <Header />
            <main className='min-h-[calc(100vh-120px)]'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
