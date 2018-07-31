import { Router } from 'express';
import * as CategoryController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * User routes
 */
route.post('/categories', userAuthenticate, CategoryController.createCategory);
route.get('/categories', userAuthenticate, CategoryController.getCategories);
route.patch('/category', userAuthenticate, CategoryController.updateCategory);
route.delete('/category', userAuthenticate, CategoryController.deleteCategory);

/**
 * Admin routes
 */
// route get all categories
route.get('/admin/categories/:id', isAccessWithRole('mod'), CategoryController.getCategoriesByUserId);

export default route;
