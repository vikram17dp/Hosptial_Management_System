import {AysncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errormiddleware.js'
import {Appointment} from '../models/appointmentSchema.js'
import {User} from '../models/userSchema.js'

export const postAppointment = AysncError(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        AadhaarNumber,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address
    } = req.body;
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !AadhaarNumber||
        !dob||
        !gender||
        !appointment_date||
        !department||
        !doctor_firstName||
        !doctor_lastName||
        !address
    ){
        return next(new ErrorHandler("Please fill the full Form!",400))
    }
    const isConflict = await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        doctorDepartment:department,
        role:"Doctor"
    })
    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor Not Found!",404));
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors Conflict! Please Contact Through Email Or Phone!",404))
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.User({
        firstName,
        lastName,
        email,
        phone,
        AadhaarNumber,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName:doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId
    })
    res.stauts(200).json({
        sucess:true,
        message:"Appointment Sent Successfully!"
    })

})