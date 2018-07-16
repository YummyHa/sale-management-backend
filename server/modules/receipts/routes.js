import { Router } from 'express';
import * as ReceiptController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';

const route = new Router();

/**
 * User routes
 */
route.post('/receipt', userAuthenticate, ReceiptController.createReceipt);
route.get('/receipts', userAuthenticate, ReceiptController.getReceipts);

export default route;