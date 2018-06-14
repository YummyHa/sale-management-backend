import Branch from './model';
import Admin from '../admins/model';
import  { User } from '../users/model';

export const createNewBranch = async (req, res) => {
    try {
        const newBranch = new Branch(req.body);
        const branch = await newBranch.save();
        res.status(201).json({ message: "Create new branch success!" });
    }
    catch (err) {
        res.status(500).json({ err });
    }

}


export const getBranchs = async (req, res) => {
    try {

        const branchs = await Branch.find({}).populate('manager');
        res.status(201).json(branchs);
    }
    catch (err) {
        res.status(500).json({ err });
    }

}


export const getBranch = async (req, res, next) => {
    try {
        const { branchId } = req.params;
        const branch = await Branch.findById(branchId);
        console.log(branchId);   
        res.status(200).json(branch);
    }
    catch (err) {
        res.status(400).json(err);
    }

}


export const getShops = async (req, res) => {
    try {

        const shops = await User.find({});
        res.status(200).json(shops);
    }
    catch (err) {
        res.status(500).json({ err });
    }

}
export const updateBranch = async (req, res) => {
    try {
        const { branchId } = req.params;
        const editBranch = req.body;
        const branch = await Branch.findByIdAndUpdate(branchId, editBranch);
        res.status(200).json(editBranch);
    }
    catch (err) {
        res.status(500).json({ err });
    }
}

export const deleteBranch = async (req, res) => {
    try {
        const { branchId } = req.params;
        console.log(branchId)
        const result = await Branch.findByIdAndRemove(branchId);
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(404).json({ message: 'Can not delete' });
    }
}


export const getShop = async (req, res, next) => {
    try {
        const { shopId } = req.params;
        const shop = await User.findById(shopId);
        console.log(shopId);   
        res.status(200).json(shop);
    }
    catch (err) {
        res.status(400).json(err);
    }

}
export const getShopBranch = async (req, res) => {
    const { branchId } = req.params;
    console.log(branchId);

    User.find({ _branch: branchId }).exec(function (err, users) {
        if (err) return (err);
        console.log('The user are an array: ', users);
        res.status(200).json(users);
    });
}

export const deleteUser = async (req, res) => {
    try {
        const { shopId } = req.params;
        const result = await User.findByIdAndRemove(shopId);
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(404).json({ message: 'Can not delete' });
    }
}
