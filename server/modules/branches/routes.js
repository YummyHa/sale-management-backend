import { Router } from 'express';
import * as BranchController from './controller';

const route  = new Router();

route.get('/getbranch', BranchController.getBranch);
route.post('/newbranch', BranchController.createNewBranch);
route.put('/updatebranch/:branchId', BranchController.updateBranch);


export default route;   