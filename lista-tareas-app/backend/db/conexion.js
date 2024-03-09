import mongoose from 'mongoose';

const URL_NAME = 'mongodb+srv://jivandaza:ufua0zBMe6PzawBm@cluster0.pmiaahh.mongodb.net/';

const conn = async (req, res) => {
    try {
        await mongoose
                .connect(URL_NAME)
                .then(() => {
                    console.log('Established connection');
                });
    } catch (err) {
        res.status(400).json({
           message: 'Not connected'
        });
    }
}

conn();