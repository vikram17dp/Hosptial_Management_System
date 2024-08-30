import { AysncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errormiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = AysncError(async (req, res, next) => {
  console.log('Request body:', req.body);
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
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !AadhaarNumber ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill the full Form!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    doctorDepartment: department,
    role: "Doctor",
  });
  if (!isConflict || isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found!", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        404
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    sucess: true,
    message: "Appointment Sent Successfully!",
    appointment
  });
});
export const getAllAppointment = AysncError(async(req,res,next)=>{
    const appointment = await Appointment.find();
    res.status(200).json({
        sucess:true,
        appointment
    })
})
export const updateAppointmentStatus = AysncError(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404));
    }
    appointment = await Appointment.findByIdAndUpdate(id,req.body,{
          new:true,
          runValidators:true,
          useFindAndModify:false
    })
    res.status(200).json({
      sucess:true,
      message:"Appointment Stauts Updated!",
      appointment
    })
})
export const deleteAppointment = AysncError(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404))
    }
    await Appointment.deleteOne({ _id: id });
    res.status(200).json({
      success:true,
      message:"Appointment Deleted!"
    })
})