import {AysncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errormiddleware.js'
import { User } from '../models/userSchema.js';
import {generateToken} from '../utils/jwtToken.js'

export const patientRegister = AysncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,AadhaarNumber,dob,gender,password,role} = req.body;
    if(!firstName || !lastName || !email || !phone || !AadhaarNumber || !dob || !gender || !password || !role){
        return next(new ErrorHandler("Please Fill Full Form!",400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already registerd!",400));
    }
    user = await User.create({firstName,lastName,email,phone,AadhaarNumber,dob,gender,password,role});
    generateToken(user,"User Registered Successfully!",200,res);
   
})
export const  login = AysncError(async(req,res,next)=>{
    const {email,password,conformPassword,role} = req.body;
    if(!email || !password || !conformPassword || !role){
        return next(ErrorHandler("Please Provide Valid Details",400));
    }
    if(password !== conformPassword){
        return next(new ErrorHandler("passwords are not matching",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password or email",400));
    }
    const ispasswordmatched = await user.comparePassword(password);
    if(!ispasswordmatched){
        return next(new ErrorHandler("Ivalid password or email",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("role is not found for this user",400));
    }
    generateToken(user,"User LoggedIn SucessFully!",200,res);
})
export const addNewAdmin = AysncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,AadhaarNumber,dob,gender,password} = req.body;
    if(!firstName || !lastName || !email || !phone || !AadhaarNumber || !dob || !gender || !password){
        return next(new ErrorHandler("Please Fill Full Form!",400));
    }
    const isRegistred = await User.findOne({email});
    if(isRegistred){
        return next(new ErrorHandler(`${isRegistred.role} With This Email Already Exists!`));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        AadhaarNumber,
        dob,
        gender,
        password,
        role:"Admin"
    });
    res.status(200).json({
        sucess:true,
        message:"New Admin Registred"
    })
})