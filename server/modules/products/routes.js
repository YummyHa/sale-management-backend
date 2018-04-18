import { Router } from 'express';
import * as ProductController from './controller';

const route = new Router();

route.post('/products', ProductController.createProduct);
route.get('/products', ProductController.getAllProducts);

export default route;
