import './db/conexion.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import auth from './rutas/autenticacion.js';
import tarea from './rutas/lista.js';

const app = express();
const port = 3001;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.use(express.json());
app.use(cors());

app.use('/api/v1', auth);
app.use('/api/v2', tarea);

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
});

app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}/`)
});