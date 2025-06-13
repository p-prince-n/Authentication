import jwt from 'jsonwebtoken'

export const verifyToken=(req, res, next)=>{
    const token=req.cookies.jwt;
    if(!token) {
        return res.status(401).json({message: 'Unauthorized - no token provided', success: false})
    }
    const isVerified=jwt.verify(token, process.env.JWT_SECRET);
    if(!isVerified){
        return res.status(401).json({message: 'Unauthorized - Invalid token ', success: false})
    }
    req.userId=isVerified.userId
    next();

}