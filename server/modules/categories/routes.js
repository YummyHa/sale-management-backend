import { Router } from 'express';
import * as CategoryController from './controller';

const route = new Router();

route.post('/categories', CategoryController.createCategory);
route.get('/categories', CategoryController.getCategories);

export default route;
