import { AysncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errormiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = AysncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !AadhaarNumber ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already registerd!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user, "User Registered Successfully!", 200, res);
});
export const login = AysncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next( new ErrorHandler("Please Provide Valid Details", 400));
  }
  // if(password !== conformPassword){
  //     return next(new ErrorHandler("passwords are not matching",400))
  // }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid password or email", 400));
  }
  const ispasswordmatched = await user.comparePassword(password);
  if (!ispasswordmatched) {
    return next(new ErrorHandler("Ivalid password or email", 400));
  }
  // if(role !== user.role){
  //     return next(new ErrorHandler("role is not found for this user",400));
  // }
  generateToken(user, "User LoggedIn SucessFully!", 200, res);
});
export const addNewAdmin = AysncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    password,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !AadhaarNumber ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistred = await User.findOne({ email });
  if (isRegistred) {
    return next(
      new ErrorHandler(`${isRegistred.role} With This Email Already Exists!`)
    );
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
    role: "Admin",
  });
  // res.status(200).json({
  //     sucess:true,
  //     message:"New Admin Registred"
  // })
  generateToken(admin, "New Admin Registered Successfully!", 200, res);
});
export const getAllDoctors = AysncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    sucess: true,
    doctors,
  });
});
export const getAllUserDetails = AysncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
export const logoutAdmin = AysncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Succesfully !",
    });
});
export const logoutPatient = AysncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Succesfully!",
    });
});
export const addNewDoctor = AysncError(async (req, res, next) => {
  // console.log('Request body:', req.body);
  // console.log('Request files:', req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar is required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supproted!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !AadhaarNumber ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  // console.log('Uploading file from:', docAvatar.tempFilePath);
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary Error"
    );
  }
  const doctor =await User.create({
    firstName,
    lastName,
    email,
    phone,
    AadhaarNumber,
    dob,
    gender,
    password,
    role:"Doctor",
    docAvatar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    },
    doctorDepartment
    
  });
  res.status(200).json({
    success:true,
    message:"New Doctor Registred!",
    doctor
  })

  return next(
    new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
  );
});
