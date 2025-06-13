import express from 'express';
import { signIn,  signUp, signOut, verifyEmail, resetPassword, forgetPassword,  checkAuth } from '../Controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const authRouter=express.Router();

authRouter.get('/check-auth', verifyToken, checkAuth)
authRouter.post('/signUp', signUp);
authRouter.post('/signIn', signIn);
authRouter.post('/signOut', signOut);
authRouter.post('/verifyEmail', verifyEmail);
authRouter.post('/forgotPassword', forgetPassword);
authRouter.post('/forgot-password/:resetToken', resetPassword);

export default authRouter