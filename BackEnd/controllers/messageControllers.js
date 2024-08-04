import {Message} from '../models/messageSchema.js'
import {AysncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errormiddleware.js';

export const sendMessage = AysncError(async (req,res,next)=>{
    const {firstName,lastName,email,phone,message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please Fill Full Form!",400));
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"message sent succesfully"
    })
})