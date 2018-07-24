import { Router } from 'express';
import * as ReceiptController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * User routes
 */
route.post('/receipt', userAuthenticate, ReceiptController.createReceipt);
route.get('/receipts', userAuthenticate, ReceiptController.getReceipts);

/**
 * Admin routes
 * params: id -> user id
 */
route.get('/admin/receipts/:id', isAccessWithRole('mod'), ReceiptController.getReceiptsByAdmin);

export default route;
