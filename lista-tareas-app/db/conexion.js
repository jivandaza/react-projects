import mongoose from 'mongoose';

const URL_NAME = 'mongodb+srv://jivandaza:ufua0zBMe6PzawBm@cluster0.pmiaahh.mongodb.net/';

const conn = async (req, res) => {
    try {
        await mongoose
                .connect(URL_NAME)
                .then(() => {
                    console.log('Conexión establecida a la base de datos');
                });
    } catch (err) {
        res.status(400).json({
           message: 'Conexión no establecida a la base de datos'
        });
    }
}

conn();