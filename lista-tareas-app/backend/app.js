import './db/conexion.js';
import express from 'express';
import cors from 'cors';
import auth from './rutas/autenticacion.js';
import tarea from './rutas/lista.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.use('/api/v1', auth);
app.use('/api/v2', tarea);

app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}/`)
});