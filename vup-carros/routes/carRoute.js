import express from 'express';
import Car from '../models/carModel.js';

const route = express.Router();

// ADD CAR
route.post('/addCar', async (req, res) => {
    try {
        const newCar = new Car(req.body);

        await newCar.save();
        res.send('Car added successfully');
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            message: 'An error occurred while adding a cart'
        });
    }
});

route.get('/getAllCars', async (req, res) => {
    try {
        const carList = await Car.find();

        if ( carList.length > 0 ) {
            return res.status(200).json(carList);

        } else {
            return res.status(404).json({ message: 'No cars found' });
        }
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            message: 'An error occurred while getting the cart list'
        });
    }
});

export default route;