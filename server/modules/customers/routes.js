import { Router } from 'express';
import * as CustomerController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * User routes
 */
route.post('/customer', userAuthenticate, CustomerController.createCustomer);
route.get('/customers', userAuthenticate, CustomerController.getCustomers);
route.delete('/customer', userAuthenticate, CustomerController.deleteCustomer);
route.patch('/customer', userAuthenticate, CustomerController.updateCustomer);

/**
 * Admin routes
 * params: id -> user id
 */
route.get('/admin/customers/:id', isAccessWithRole('mod'), CustomerController.getCustomersByAdmin);

export default route;
