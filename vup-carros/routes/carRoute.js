import express from 'express';
import Car from '../models/carModel.js';

const route = express.Router();

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

route.put("/editCar", async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.body._id });
        car.name = req.body.name;
        car.image = req.body.image;
        car.fuelType = req.body.fuelType;
        car.rentPerHour = req.body.rentPerHour;
        car.capacity = req.body.capacity;

        await car.save();

        res.send("Car details updated successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
});

route.post("/deleteCar", async (req, res) => {
    try {
        await Car.findOneAndDelete({ _id: req.body.carid });

        res.send("Car deleted successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
});

export default route;