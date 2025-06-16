import User from "../models/auth.model.js"
import bcrypt from "bcryptjs"
import crypto from 'crypto'
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail, generateForgotEmail, sendResetPasswordSuccess } from "../mailTrap/email.js"

export const signUp=async (req, res, next) => {
    const {email, password, name}=req.body
    try{
        if(!email || !password || !name){
            return res.status(400).json({message: 'All fields are required', success: false})
        }
        const Existuser= await User.findOne({email});
        if(Existuser){
            return res.status(400).json({message: 'email is already exist', success: false})
        }
        if(password.length < 6){
            return res.status(400).json({message: 'password should contain at least 6 character', success: false})
        }

        const hashPassword= await bcrypt.hash(password, 10);
        const verificationToken=Math.floor(100000 + (Math.random() * 900000)).toString()

        const user= new User({
            email,
            name,
             password: hashPassword,
             verificationToken,
             verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true, message: 'User created Successfully', user:{
                ...user._doc,
                password: undefined
            }
        })

    }catch(e){
        res.status(500).json({message: e.message, success: false})
    }
    
}
export const verifyEmail=async (req, res, next) => {
    const {code}=req.body
    try{
        const user= await User.findOne({
            verificationToken: code,
            verificationTokenExpiredAt: {$gt: Date.now()}
        })
        if(!user){
            return res.status(400).json({message: 'Invalid or expired verification code', success: false})

        }
        user.verificationToken= undefined;
        user.isVerified=true;
        user.verificationTokenExpiredAt= undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name)
        res.status(201).json({
            success: true, message: 'Email verified successfully', user:{
                ...user._doc,
                password: undefined
            }
        })



    }catch(e){
        res.status(500).json({message: e.message, success: false})
    }
    
}

export const signIn=async (req, res, next) => {
    const {email, password}=req.body
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User with this email doesn\'t exist', success: false})
        }
        if(password.length < 6){
            return res.status(400).json({message: 'password should contain at least 6 character', success: false})
        }
        const verifyPass=await bcrypt.compare(password, user.password);
        if(!verifyPass){
            return res.status(400).json({message: 'Invalid Password', success: false})
        }
        generateTokenAndSetCookie(res, user._id)
        user.lastLogin= Date.now();
        await user.save();
         res.status(201).json({
            success: true, message: 'Login successfully', user:{
                ...user._doc,
                password: undefined
            }
        })




    }catch(e){
        res.status(500).json({message: e.message, success: false})
    }
    
}

export const signOut= (req, res, next) => {

        res.clearCookie("jwt")
         res.status(201).json({
            success: true, message: 'Log out successfully'
        })


}

export const forgetPassword=async(req, res, next)=>{
    const {email}=req.body;
    try{
        if(!email){
            return res.status(404).json({message: 'Email is required', success: false})
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User with this email doesn\'t exist', success: false})
        }

        const fogotToken= crypto.randomBytes(20).toString('hex');
        const forgotTokenExpiredAt=Date.now() + 1 * 60 * 60 * 1000;

        await generateForgotEmail(user.email, fogotToken);
        user.resetPasswordToken=fogotToken;
        user.resetPasswordTokenExpiredAt=forgotTokenExpiredAt;
        await user.save()

        res.status(200).json({success: true, message: 'Link is send to your email'})

    }catch(e){
        res.status(500).json({message: e.message, success: false})
    }
}


export const resetPassword=async(req, res, next)=>{
    const {resetToken}=req.params
    const {password}=req.body
    try{
        const user= await User.findOne({resetPasswordToken: resetToken, resetPasswordTokenExpiredAt: {$gt: Date.now()}});
        if(!user){
            res.status(400).json({message: 'Invalid or Expired reset Token', success: false})
        }
        const hashPassword= await bcrypt.hash(password, 10)
        user.password=hashPassword;
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpiredAt=undefined;

        await user.save();
        await sendResetPasswordSuccess(user.email);
        res.status(200).json({ success: true, message: "Password reset successful" })


    }catch(e){
        res.status(500).json({message: e.message, success: false})
    }
}

export const checkAuth=async(req, res, next)=>{
    try{
        const user= await User.findById(req.userId).select('-password')
        if(!user){
            res.status(400).json({message: 'User not found', success: false})
        }
         res.status(200).json({success: true,  user})


    }catch(e){
        res.status(500).json({message: e.message, success: false})
    }
}