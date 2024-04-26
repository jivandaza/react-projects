import express from 'express';
import authToken from "../middleware/authToken.js";
import userSignUpController from './../controller/user/userSignUp.js';
import userSignInController from './../controller/user/userSignIn.js';
import userDetailsController from './../controller/user/userDetails.js';
import userLogoutController from "../controller/user/userLogout.js";
import allUsersController from "../controller/admin/allUsers.js";
import updateUserRoleController from "../controller/admin/updateUserRole.js";
import uploadProductController from "../controller/product/uploadProduct.js";
import getProductsController from "../controller/product/getProducts.js";
import updateProductController from "../controller/product/updateProduct.js";

const router = express.Router();

//  user
router.post('/usuario/registrar', userSignUpController);
router.post('/usuario/acceso', userSignInController);
router.get('/usuario/datos', authToken, userDetailsController);
router.get('/usuario/salir', userLogoutController);

//  admin panel
router.get('/admin/usuarios', authToken, allUsersController);
router.put('/admin/actualizar-usuario', authToken, updateUserRoleController);

// product
router.post('/producto/subir', authToken, uploadProductController);
router.get('/producto/lista', authToken, getProductsController);
router.put('/producto/editar', authToken, updateProductController);

export default router;