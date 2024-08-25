import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name Contain Atleast 3 charcters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name conatin Atleast 3 charcters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Provide a valid email!.",
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]{10}$/.test(value),
      message: "Phone number must contain exactly 10 digits",
    },
  },
  AadhaarNumber: {
    type: String,
    required: true,
    minLength: [12, "AadhaarNumber must contain exactly 12 digits"],
    maxLength: [12, "AadhaarNumber must contain exactly 12 digits"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [11, "password must conatin the 8 charcters!"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});
userSchema.pre("save", async function (next) {
  //Pre-save Hook
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enterdpassword) {
  //comparePassword Method
  return await bcrypt.compare(enterdpassword, this.password); // boolean
};
userSchema.methods.generateJsonWebToken = function () {
  //generatePassword Method
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // expries in 7days
  });
};

export const User = mongoose.model("User", userSchema);
