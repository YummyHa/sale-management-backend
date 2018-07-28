import { Router } from 'express';
import * as MessageController from './controller';

const route = new Router();

route.get('/messages/:id', MessageController.getMessage);

export default route;
