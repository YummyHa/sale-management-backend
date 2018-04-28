import { Router } from 'express';
import * as AdminController from './controller';
import { isAccessWithRole } from './middleware';
import jwt from 'jsonwebtoken';

const route  = new Router();

route.post('/signup', AdminController.signup);
route.post('/signin', AdminController.signin);
route.get('/admins', isAccessWithRole('superadmin'), AdminController.getAllAdmin);

export default route;