import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    image: [],
    description: String,
    price: Number,
    sellingPrice: Number
}, {
    timestamps: true
});

export default mongoose.model('product', productSchema);