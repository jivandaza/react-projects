import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
    productId: {
        ref: 'product',
        type: String
    },
    quantity: Number,
    userId: String
}, {
    timestamps: true
});

export default mongoose.model('cartProduct', cartProductSchema);