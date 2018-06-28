import { Router } from 'express';

import * as ProductController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

route.post('/products', userAuthenticate, ProductController.createProduct);
route.get('/products', userAuthenticate, ProductController.getAllProducts);
route.get('/products/category/:id', userAuthenticate, ProductController.getProductsByCateId);
route.get('/products/:id', userAuthenticate, ProductController.getProductsById);

export default route;
