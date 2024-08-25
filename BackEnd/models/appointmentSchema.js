import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
      appointment_date:{
        type:String,
        required:true
      },
      department:{
        type:String,
        required:true
      },
      doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
      },
      hasVisited:{
        type:Boolean,
        default:false
      },
      doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
      },
      patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
      },
      address:{
        type:String,
        required:true
      },
      status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
      }                                                                                                                        
})

export const Appointment = mongoose.model("Appointment",appointmentSchema)