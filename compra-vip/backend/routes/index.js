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
import getCategoryController from "../controller/product/getCategory.js";
import getProductsByCategoryController from "../controller/product/getProductsByCategory.js";
import getProductController from "../controller/product/getProduct.js";
import searchProductController from "../controller/product/searchProduct.js";
import addProductToCartController from "../controller/cart/addProductToCart.js";
import countProductsToCartController from "../controller/cart/countProductsToCart.js";
import viewProductsOfCartController from "../controller/cart/viewProductsOfCart.js";
import updateProductToCartController from "../controller/cart/updateProductToCart.js";
import deleteProductToCartController from "../controller/cart/deleteProductToCart.js";

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
router.get('/producto/lista', getProductsController);
router.put('/producto/editar', authToken, updateProductController);
router.get('/producto/categorias', getCategoryController);
router.post('/producto/productos-categoria', getProductsByCategoryController);
router.post('/producto/datos', getProductController);
router.get('/producto/buscar', searchProductController);

// cart product
router.post('/carrito/agregar', authToken, addProductToCartController);
router.get('/carrito/contar', authToken, countProductsToCartController);
router.get('/carrito/datos', authToken, viewProductsOfCartController);
router.post('/carrito/actualizar', authToken, updateProductToCartController);
router.post('/carrito/eliminar', authToken, deleteProductToCartController);

export default router;