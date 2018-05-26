import Branch from './model';
import Admin from '../admins/model';
import User from '../users/model';
import mongoose from 'mongoose';

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

export const getBranch = async (req, res) => {
    try {

        const branchs = await Branch.find({}).populate('manager');
        res.status(201).json(branchs);
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


