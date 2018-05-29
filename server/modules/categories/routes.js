import { Router } from 'express';
import * as CategoryController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

route.post('/categories', userAuthenticate, CategoryController.createCategory);
route.get('/categories', userAuthenticate, CategoryController.getCategories);

export default route;
