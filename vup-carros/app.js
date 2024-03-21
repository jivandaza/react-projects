import './db/connection.js';
import carRoute from "./routes/carRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use('/api/car', carRoute);
app.use('/api/user', userRoute);

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}/`)
});