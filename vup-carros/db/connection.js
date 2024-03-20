import mongoose from 'mongoose';

const URI = 'mongodb+srv://jivandaza:u4G5jGZ5ALTqH9Ay@cluster0.obvwanw.mongodb.net/vup-cars';

const connect = async () => {
    try {
        await mongoose.connect(URI).then(() => {
            console.log('Established connection.');
        });
    } catch (err) {
        console.error(err.message);

        console.log('Connection not established.');
    }
}

connect();