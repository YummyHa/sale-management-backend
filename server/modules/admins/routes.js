import { Router } from 'express';
import * as AdminController from './controller';
import { isAccessWithRole } from './middleware';
import jwt from 'jsonwebtoken';

const route  = new Router();
//super
route.post('/newSuper',isAccessWithRole('superadmin'), AdminController.createSuper);
route.get('/admins', isAccessWithRole('superadmin'), AdminController.getAllAdmin);
// route.get('/admins',  AdminController.getAllAdmin);

// --User--
route.get('/listadmin/:adminId', AdminController.getlist);
route.post('/newAdmin/:adminId', isAccessWithRole('admin'), AdminController.newAdmin);
route.post('/signin', AdminController.signin);
route.put('/admin/:adminId', AdminController.replaceUser);
route.get('/getadmin/:adminId', AdminController.getUser);
route.delete('/deleteadmin/:adminId',isAccessWithRole('superadmin'), AdminController.deleteUser);
route.get('/admins/count',isAccessWithRole('superadmin'), AdminController.countUser);
route.patch('/update/:adminId', isAccessWithRole('admin'), AdminController.updateUser);

// --Branch--

//
route.get('/getCustomer/:adminId',isAccessWithRole('mod'), AdminController.getShop);
export default route;   