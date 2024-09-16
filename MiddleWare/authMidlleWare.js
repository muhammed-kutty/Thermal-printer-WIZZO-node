import {UserLoginInfo} from '../Models/userLogininfo.js'
import { verifyToken } from '../services/jwt.js'

const authMiddleware =async (req,res,next)=>{
    console.log(req);
    const token = req?.header('Authorization')?.replace('Bearer ', '');
    console.log('Received Token:', token);
    try {
        const decoded = verifyToken(token);
        console.log('Decoded Token:', decoded);
        console.log('Decoded Token id===:', decoded.id);

    
        const user = await UserLoginInfo.findOne({ where: { UserRegisterID: decoded.id } });
        console.log('Fetched User:', user);
    
        if (!user) {
            throw new Error();
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

export {authMiddleware}