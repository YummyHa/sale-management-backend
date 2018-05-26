import { Router } from 'express';

import * as ProductController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

route.post('/products', userAuthenticate, ProductController.createProduct);
route.get('/products', userAuthenticate, ProductController.getAllProducts);

export default route;
