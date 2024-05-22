import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = 3001 || process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: process.env.PORT,
    credentials: true,
}));
app.use(cookieParser(0));
app.use('/api', router);

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
});

connectDB().then(() => {
    console.log('Conexión DB establecida...');
    app.listen(port, () => {
        console.log(`Servidor iniciado en: http://localhost:${port}/`)
    });
});