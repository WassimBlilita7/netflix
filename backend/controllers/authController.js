import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req, res) {
    try {
        const {email, password,username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false, message: 'Please provide an email, username and password'});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message: 'Please provide a valid email'});
        }
        if(password.length < 6){
            return res.status(400).json({success:false, message: 'Password should be at least 6 characters'});
        }

        const existingUserByEmail = await User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false, message: 'User with this email already exists'});
        }

        const existingUserByUsername = await User.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false, message: 'User with this username already exists'});
        }

        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);

        const newUser = new User({email, password:passwordHash, username});
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                success:true,
                user : {
                    ...newUser._doc,
                    password: undefined
                }
            })

        
        

    } catch (error) {
        return res.status(500).json({success:false, message: 'Internal server error'});
    }
};

export async function login(req, res) {
    res.send('Login route');
};

export async function logout(req, res) {
    res.send('Logout route');
};