import { Router } from 'express';
import * as ProducerController from './controller';
import { userAuthenticate } from '../../middlewares/userAuthenticate';
import { isAccessWithRole } from '../admins/middleware';

const route = new Router();

/**
 * User routes
 */
route.post('/producer', userAuthenticate, ProducerController.createProducer);
route.get('/producers', userAuthenticate, ProducerController.getProducers);
route.delete('/producer', userAuthenticate, ProducerController.deleteProducer);
route.patch('/producer', userAuthenticate, ProducerController.updateProducer);

/**
 * Admin routes
 * params: id -> user id
 */
route.get('/admin/producers/:id', isAccessWithRole('mod'), ProducerController.getProducersByAdmin);

export default route;
