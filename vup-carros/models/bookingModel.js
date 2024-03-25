import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        bookedTimeSlots: {
            from: { type: String },
            to: { type: String }
        },
        totalHours: { type: Number },
        totalAmount: { type: Number },
        transactionId: { type: String },
        driverRequired : {type : Boolean}
    },
    {timestamps: true}
);

export default mongoose.model("bookings", carSchema);