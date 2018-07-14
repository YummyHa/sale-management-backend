import { Router } from 'express';
import * as CustomerController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

/**
 * User routes
 */
route.post('/customer', userAuthenticate, CustomerController.createCustomer);
route.get('/customers', userAuthenticate, CustomerController.getCustomers);
route.delete('/customer', userAuthenticate, CustomerController.deleteCustomer);
route.patch('/customer', userAuthenticate, CustomerController.updateCustomer);

export default route;
