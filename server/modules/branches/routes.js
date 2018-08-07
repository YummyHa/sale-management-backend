import { Router } from 'express';
import * as BranchController from './controller';
import jwt from 'jsonwebtoken';
import { isAccessWithRole } from '../admins/middleware';

const route  = new Router();
//branch api
route.get('/getbranchs',isAccessWithRole('superadmin'), BranchController.getBranchs);
route.get('/getBranch/:branchId', isAccessWithRole('superadmin'), BranchController.getBranch);
route.post('/newbranch',isAccessWithRole('superadmin'), BranchController.createNewBranch);
route.patch('/updatebranch/:branchId',isAccessWithRole('superadmin'), BranchController.updateBranch);
route.delete('/deleteBranch/:branchId',isAccessWithRole('superadmin'), BranchController.deleteBranch);

//shop api
route.get('/getshops',isAccessWithRole('superadmin'), BranchController.getShops);
route.delete('/deleteShop/:shopId',isAccessWithRole('admin'), BranchController.deleteUser);
route.get('/getshop/:shopId',isAccessWithRole('mod'), BranchController.getShop);

//get user of branch
route.get('/getUserBranch/:branchId',isAccessWithRole('admin'), BranchController.getShopBranch);

//get branch of admin
route.get('/getlistshop/:adminId',isAccessWithRole('admin'), BranchController.getlistbranch);

export default route;   