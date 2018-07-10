import { Router } from 'express';
import * as CustomerController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

/**
 * User routes
 */
route.post('/customer', userAuthenticate, CustomerController.createCustomer);
route.get('/customers', userAuthenticate, CustomerController.getCustomers);

export default route;
