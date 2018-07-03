import { Router } from 'express';

import * as ProductController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * Routes for user
 */
route.post('/products', userAuthenticate, ProductController.createProduct);
route.get('/products', userAuthenticate, ProductController.getAllProducts);
route.get('/products/category/:id', userAuthenticate, ProductController.getProductsByCateId);
route.get('/products/:id', userAuthenticate, ProductController.getProductsById);

/**
 * Routes for admin
 */
// get all products by user id
route.get('/admin/products/:id', isAccessWithRole('mod'), ProductController.getAllProductsByUserId);

// get all products by category id
route.get('/admin/products/category/:id', isAccessWithRole('mod'), ProductController.getProductsByCateId);

// get product detail by product id
route.get('/products/:id', isAccessWithRole('mod'), ProductController.getProductsById);

export default route;
