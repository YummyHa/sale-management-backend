import { Router } from 'express';
import * as UserController from './controller';

import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

route.post('/users', UserController.createUser);
route.get('/users/me', userAuthenticate, UserController.authenticateUser);
route.post('/users/login', UserController.loginUser);
route.delete('/users/me/token', userAuthenticate, UserController.logoutUser);

export default route;
