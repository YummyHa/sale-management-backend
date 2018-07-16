import { Router } from 'express';
import * as BranchController from './controller';

const route  = new Router();
//branch api
route.get('/getbranchs', BranchController.getBranchs);
route.get('/getBranch/:branchId', BranchController.getBranch);
route.post('/newbranch', BranchController.createNewBranch);
route.patch('/updatebranch/:branchId', BranchController.updateBranch);
route.delete('/deleteBranch/:branchId', BranchController.deleteBranch);

//shop api
route.get('/getshops', BranchController.getShops);
route.delete('/deleteShop/:shopId', BranchController.deleteUser);
route.get('/getshop/:shopId', BranchController.getShop);

//get user of branch
route.get('/getUserBranch/:branchId', BranchController.getShopBranch);

//get branch of admin
route.get('/getlistshop/:adminId', BranchController.getlistbranch);

export default route;   