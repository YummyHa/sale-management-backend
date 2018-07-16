import { Router } from 'express';
import * as UserController from './controller';

import { userAuthenticate } from '../../middlewares/userAuthenticate';

import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * User routes
 */
route.post('/users', UserController.createUser);
route.get('/users/me', userAuthenticate, UserController.authenticateUser);
route.post('/users/login', UserController.loginUser);
route.delete('/users/me/token', userAuthenticate, UserController.logoutUser);
route.patch('/users/update', userAuthenticate, UserController.updateUser);

/**
 * Admin routes
 */
route.patch('/users/update/admin/:id', isAccessWithRole('admin'), UserController.updateUserByAdmin)
export default route;
