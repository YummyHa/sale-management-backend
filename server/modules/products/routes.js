import { Router } from 'express';
// import multer from 'multer';

import * as ProductController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

// config multer for uploading product image
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './server/uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// })

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

// const upload = multer({ 
//   storage: storage, 
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter,
// });

/**
 * Routes for user
 */
route.post('/products', userAuthenticate, ProductController.createProduct);
route.get('/products', userAuthenticate, ProductController.getAllProducts);
route.get('/products/category/:id', userAuthenticate, ProductController.getProductsByCateId);
route.get('/products/:id', userAuthenticate, ProductController.getProductsById);
route.patch('/product', userAuthenticate, ProductController.updateProduct);
route.delete('/product', userAuthenticate, ProductController.deleteProdcut);

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
