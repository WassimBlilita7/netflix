import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export function generateTokenAndSetCookie(userId,res){
    const token = jwt.sign({id:userId},ENV_VARS.JWT_SECRET,{expiresIn:'10d'});
    res.cookie("jwt-netflix",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 10*24*60*60*1000 // 10 days
    }
    );

    return token;
}