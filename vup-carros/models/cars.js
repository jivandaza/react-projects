import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        rentPerHour: {
            type: Number,
            required: true
        },
        fuelType: {
            type: String,
            required: true
        },
        bookedTimeSlots: [],
        capacity: {
            type: Number,
            required: true
        }
    }
);

export default mongoose.model("Car", carSchema);