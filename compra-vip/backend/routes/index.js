import express from 'express';
import authToken from "../middleware/authToken.js";
import userSignUpController from './../controller/user/userSignUp.js';
import userSignInController from './../controller/user/userSignIn.js';
import userDetailsController from './../controller/user/userDetails.js';
import userLogoutController from "../controller/user/userLogout.js";
import allUsersController from "../controller/admin/allUsers.js";
import updateUserRole from "../controller/admin/updateUserRole.js";

const router = express.Router();

//  user
router.post('/usuario/registrar', userSignUpController);
router.post('/usuario/acceso', userSignInController);
router.get('/usuario/datos', authToken, userDetailsController);
router.get('/usuario/salir', userLogoutController);

//  admin panel
router.get('/admin/usuarios', authToken, allUsersController);
router.put('/admin/actualizar-usuario', authToken, updateUserRole);

export default router;