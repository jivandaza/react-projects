import express from 'express';
import authToken from "../middleware/authToken.js";
import userSignUpController from './../controller/userSignUp.js';
import userSignInController from './../controller/userSignIn.js';
import userDetailsController from './../controller/userDetails.js';
import userLogoutController from "../controller/userLogout.js";

const router = express.Router();

router.post('/usuario/registrar', userSignUpController);
router.post('/usuario/acceso', userSignInController);
router.get('/usuario/datos', authToken, userDetailsController);
router.get('/usuario/salir', userLogoutController);

export default router;