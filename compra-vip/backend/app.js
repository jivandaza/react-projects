import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

dotenv.config();

const app = express();
const port = 3001 || process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser(0));
app.use('/api', router);

connectDB().then(() => {
    console.log('Conexión DB establecida...');
    app.listen(port, () => {
        console.log(`Servidor iniciado en: http://localhost:${port}/`)
    });
});