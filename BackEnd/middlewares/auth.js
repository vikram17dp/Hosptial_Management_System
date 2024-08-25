import { User } from "../models/userSchema.js";
import { AysncError } from "./catchAsyncError.js";
import ErrorHandler from "./errormiddleware.js";
import jwt from 'jsonwebtoken'

export const isAdminAuthenicated = AysncError(async(req,res,next)=>{
    // console.log("Request cookies:", req.cookies);
    // console.log("Request body:", req.body);
    
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not Authenticated!",400));

    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin"){
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`,403)
        )
    }
    next();
})
export const isPatientAuthenicated = AysncError(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("patient not Authenicated",400));

    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(!req.isAuthenticated() || req.user.role !== "Patient"){
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`,403)
        )
    }
    next();
})