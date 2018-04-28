import Admin from './model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from './token';


export const signup = async(req, res, next) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if (admin.length >= 1) {
                return res.status(409).json({
                    message: 'This email already exists'
                })
            } else
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ err: err })

                    }
                    if (req.body.role === 'superadmin') {
                        var roles = ["superadmin", "admin", "mod"]
                    }
                    if (req.body.role === 'admin') {
                        var roles = ["superadmin", "admin"]
                    }
                    if (req.body.role === 'mod') {
                        var roles = ["mod"]
                    }
                    const admin = new Admin({
                        email: req.body.email,
                        password: hash,
                        roles: roles
                    })
                    admin.save()
                        .then(result => res.status(201).json({ "message": "Successfully" }))
                        .catch(err => res.json({ err }))
                })
        })
}

export const signin = async(req, res) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if (admin.length < 1) {
                return res.json({ message: 'Account does not exist' })
            } else {
                bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                    if (err) return res.json({ err })
                    if (result) {
                    
                        const token = jwt.sign({
                            email: admin[0].email,
                            _id: admin[0]._id,
                            roles: admin[0].roles
                        }, JWT_SECRET)
                        return res.status(200).json({
                            message: 'Logged in successfully',
                            token: token
                        })                      
                    }
                })
            }
        })
        .catch(err => res.json({ err }))
}

export const getAllAdmin = async(req, res) => {
    const admin = await Admin.find({});
    res.status(200).json(admin);
}