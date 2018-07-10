import { Router } from 'express';
import * as OrderController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

/**
 * User routes
 */
route.post('/order', userAuthenticate, OrderController.createOrder);
route.get('/orders', userAuthenticate, OrderController.getOrders);

export default route;