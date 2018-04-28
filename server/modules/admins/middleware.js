import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './token';

export const isAccessWithRole = role => {
    return (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const decoded_token = jwt.verify(token, JWT_SECRET)
        if (decoded_token.roles.indexOf(role) > -1) next();
        else {
            res.json({
                message: 'You do not have permission to access'
            })
        }
    }
}
