import express from 'express';
import userSignUpController from './../controller/userSignUp.js';
import userSignInController from './../controller/userSignIn.js';

const router = express.Router();

router.post('/usuario/registrar', userSignUpController);
router.post('/usuario/acceso', userSignInController);

export default router;