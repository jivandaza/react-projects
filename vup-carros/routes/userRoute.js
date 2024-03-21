import express from 'express';
import User from "./../models/userModel.js";
import bcrypt from 'bcryptjs';

const route = express.Router();

// REGISTER USER
route.post('/register', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        const err = true;

        const existUser = await User.findOne({ username });

        if ( existUser ) {
            return res.status(200).json({
                msg: 'User is already registration',
                err
            });
        }

        if ( password !== confirmPassword ) {
            return res.status(200).json({
                msg: 'Passwords do not match',
                err
            });
        }

        const hashPassword = bcrypt.hashSync(password);

        const newUser = new User({ username, password: hashPassword });

        await newUser.save().then(() => {
            res.status(200).json({
                msg: 'Registration success',
                err: false
            });
        });
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            msg: 'An error occurred while registration'
        });
    }
});

// LOGIN USER
route.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const err = true;

        const user = await User.findOne({ username });

        if ( !user ) {
            return res.status(200).json({
                msg: 'User is not registration',
                err
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            password,
            user.password
        );

        if ( !isPasswordCorrect ) {
            return res.status(200).json({
                msg: 'Password provided is incorrect',
                err
            });
        }

        return res.status(200).json({
            msg: 'Login success',
            err: false,
            user
        });
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            msg: 'An error occurred while logging in'
        });
    }
});

export default route;