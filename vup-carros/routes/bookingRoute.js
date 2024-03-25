import express from "express";
import Booking from "./../models/bookingModel.js";
import Car from "./../models/carModel.js";

const stripe = require('stripe')('sk_test_51Oy2zKJuFre07c3eelJX6HK2LNPuuozPxsCEK2kYYjKbzx6kkqyyKJHneoPt337LLkY6xUN0JCpQsIkqL9Crv6VP00BB63qFwa');
const route = express.Router();

route.post('/bookCar', async (req, res) => {
    const { token } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const newBooking = new Booking(req.body);
        await newBooking.save();

        const car = await Car.findOne({_id: req.body.car});
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await car.save();

        res.send('You car booked successfully');
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'An error occurred while adding a booking car'
        });
    }
});

export default route;