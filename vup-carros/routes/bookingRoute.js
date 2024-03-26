import express from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import Booking from './../models/bookingModel.js';
import Car from './../models/carModel.js';

const stripe = new Stripe('sk_test_51Oy2zKJuFre07c3eelJX6HK2LNPuuozPxsCEK2kYYjKbzx6kkqyyKJHneoPt337LLkY6xUN0JCpQsIkqL9Crv6VP00BB63qFwa');
const route = express.Router();

route.post('/bookCar', async (req, res) => {
    const { token } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.charges.create(
            {
                amount: req.body.totalAmount * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4(),
            }
        );

        if ( payment ) {
            req.body.transactionId = payment.source.id;
            const newBooking = new Booking(req.body);
            await newBooking.save();

            const car = await Car.findOne({_id: req.body.car});
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await car.save();

            res.send('Your booking is successfull');

        } else {
            return res.status(400).json({
                message: 'An error occurred while payment a booking car'
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'An error occurred while adding a booking car'
        });
    }
});

route.get('/getAllBookings', async(req, res) => {
    try {
        const bookings = await Booking.find().populate('car');
        res.send(bookings);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'An error occurred while get all bookings'
        });
    }
});

export default route;