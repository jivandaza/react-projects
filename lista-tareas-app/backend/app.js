import express from 'express';
import './db/conexion.js';
import auth from './rutas/autenticacion.js';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.use('/api/v1', auth);

app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}/`)
})