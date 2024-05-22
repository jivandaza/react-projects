import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://jivandaza:1IVYAOJFuymeG7to@cluster0.ekcyzsi.mongodb.net/compra-vip');
    } catch (err) {
        console.error(err);
    }
}

export default connectDB;