import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
})

app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}/`)
})