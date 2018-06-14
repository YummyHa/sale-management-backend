import { Router } from 'express';
import * as BranchController from './controller';

const route  = new Router();

route.get('/getbranchs', BranchController.getBranchs);
route.get('/getBranch/:branchId', BranchController.getBranch);
route.post('/newbranch', BranchController.createNewBranch);
route.delete('/deleteShop/:shopId', BranchController.deleteUser);
route.put('/updatebranch/:branchId', BranchController.updateBranch);
route.delete('/deleteBranch/:branchId', BranchController.deleteBranch);
route.get('/getUserBranch/:branchId', BranchController.getShopBranch);
route.get('/getshops', BranchController.getShops);
route.get('/getshop/:shopId', BranchController.getShop);

export default route;   