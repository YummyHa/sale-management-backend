import Admin from './model';
import Branch from '../branches/model';
import { User } from '../users/model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from './token';


export const createSuper = async (req, res, next) => {
    try {
        if (req.body.role === 'superadmin') {
            var roles = ["superadmin", "admin", "mod"]
        }
        const newSuper = new Admin(req.body);
        newSuper.roles = roles;
        const user = await newSuper.save();
        res.status(201).json(user);

    }
    catch (err) {
        res.status(400).json({ message: "Email or username already exists!" });

    }

}



export const newAdmin = async (req, res, next) => {
    try {
        if (req.body.roles === 'admin') {
            var roles = ["admin", "mod"]
        }
        if (req.body.roles === 'mod') {
            var roles = ["mod"]
        }
        const { adminId } = req.params;
        const newUser = new Admin(req.body);
        newUser.roles = roles;
        const user_parent = await Admin.findById(adminId);
        newUser.created_By = user_parent;   
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({err});

    }

}

export const signin = async (req, res, next) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if (admin.length < 1) {
                return res.status(404).json({ message: 'Mail is not found, user does not exist' });
            }

            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: 'Password wrong!' });
                }
                if (result) {
                    const token = jwt.sign({
                        _id: admin[0]._id,
                        username: admin[0].username,
                        email: admin[0].email,
                        roles: admin[0].roles,
                        category: admin[0].category,
                        created_By: admin[0].created_By,
                        status: admin[0].status
                    }, JWT_SECRET);

                    return res.status(200).json({ message: 'Login successful', token: token });
                }
                res.status(401).json({ message: 'Login failed !' });
            })
        })
        .catch()
}



export const getAllAdmin = async (req, res) => {
    try {
        const admin = await Admin.find({}).populate('created_By', '_id');
        res.status(200).json(admin);
    }
    catch (err) {
        res.status(400).json({ message: 'No user in database!' });
    }

}
export const updateUser = async (req, res) => {
    try {
        if (req.body.roles === 'superadmin') {
            var roles = ["superadmin", "admin", "mod"]
        }
        if (req.body.roles === 'admin') {
            var roles = ["admin", "mod"]
        }
        if (req.body.roles === 'mod') {
            var roles = ["mod"]
        }

        const { adminId } = req.params;
        const newAdmin = req.body;
        // newAdmin.roles = roles;
        const newUser = await Admin.findById(adminId, async function (err, doc) {
            try {
                // if (err) {
                //     res.status(500).json({ message: "Update user failed!" })
                // }
                doc.username = req.body.username;
                doc.password = req.body.password;
                doc.roles = req.body.roles;
                doc.email = req.body.email;
                doc.status = req.body.status;
                await doc.save();
                console.log(doc.password);
                res.status(200).json({ doc });
            } catch (err) {
                res.status(404).json({ message: 'Update user failed!' });
            }
        });
       


    }
    catch (err) {
        res.status(404).json({ message: 'Update user failed!' })
    }
}
export const replaceUser = async (req, res, next) => {
    try {
        if (req.body.roles === 'superadmin') {
            var roles = ["superadmin", "admin", "mod"]
        }
        if (req.body.roles === 'admin') {
            var roles = ["admin", "mod"]
        }
        if (req.body.roles === 'mod') {
            var roles = ["mod"]
        }

        const { adminId } = req.params;
        const newAdmin = req.body;
        newAdmin.roles = roles;
        const newUser = await Admin.findById(adminId, function (err, doc) {
            if (err) {
                res.status(500).json({ message: "Update user failed!" })
            }
            doc.username = req.body.username;
            doc.password = req.body.password;
            doc.roles = req.body.roles;
            doc.email = req.body.email;
            doc.save();
        });
        res.status(200).json({ newUser });


    }
    catch (err) {
        res.status(404).json({ message: 'Update user failed!' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { adminId } = req.params;
        const result = await Admin.findByIdAndRemove(adminId);
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(404).json({ message: 'Can not delete' });
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { adminId } = req.params;
        const user = await Admin.findById(adminId);
        console.log(adminId);   
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }

}


export const getlist = async (req, res) => {
    const { adminId } = req.params;
    console.log(adminId);
    Admin.find({ created_By: adminId }).exec(function (err, admins) {
        if (err) return (err);
        console.log('The admins are an array: ', admins);
        res.status(200).json(admins);
    });
}

export const getShop = async (req, res) => {
   
        const { adminId } = req.params;
        console.log(adminId);
        User.find({ _admin: adminId}).exec(function (err, shops) {
            if(err) return (err);
            console.log('the shops are an array: ', shops);
            res.status(200).json(shops);
        })
 

}

export const createNewBranch = async (req, res) => {
    try {
        const { adminId } = req.params;
        const newBranch = new Branch(req.body);

        const user = await Admin.findById(adminId);
        newBranch.manager = user;
        await newBranch.save();
        user.branchs.push(newBranch);
        await user.save();
        res.status(201).json({ message: "Create new branch success!" });
    }
    catch (err) {
        res.status(500).json({ message: "Create new branch faild!" });
    }

}

export const countUser = async (req, res, next) => {
    Admin.count((err, count) => {
        if(err) {return console.error(err); }
        res.status(200).json(count);
    })
}