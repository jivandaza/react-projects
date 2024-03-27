import './db/connection.js';
import carRoute from "./routes/carRoute.js";
import userRoute from "./routes/userRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import path from 'path';
import { fileURLToPath } from "url";
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.use(express.json());
app.use(cors());

app.use('/api/car', carRoute);
app.use('/api/user', userRoute);
app.use('/api/booking', bookingRoute);

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}/login`)
});