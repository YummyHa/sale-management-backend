import { Router } from 'express';
import * as OrderController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * User routes
 */
route.post('/order', userAuthenticate, OrderController.createOrder);
route.get('/orders', userAuthenticate, OrderController.getOrders);

/**
 * Admin routes
 * params: id -> user id
 */
route.get('/admin/orders/:id', isAccessWithRole('mod'), OrderController.getOrdersByAdmin);

export default route;