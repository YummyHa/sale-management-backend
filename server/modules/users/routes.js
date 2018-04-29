import { Router } from 'express';
import * as UserController from './controller';

import { authenticate } from './middlewares';

const route = new Router();

route.post('/users', UserController.createUser);
route.get('/users/me', authenticate, UserController.authenticateUser);
route.post('/users/login', UserController.loginUser);
route.delete('/users/me/token', authenticate, UserController.logoutUser);

export default route;
