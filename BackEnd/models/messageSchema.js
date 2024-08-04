import mongoose from 'mongoose'
import validator from 'validator'

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name Contain Atleast 3 charcters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name conatin Atleast 3 charcters"],
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Provide a valid email!."
        }
    },
    phone: {
        type: String, // Changed to String
        required: true,
        validate: {
            validator: (value) => /^[0-9]{10}$/.test(value),
            message: "Phone number must contain exactly 10 digits"
        }
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message Contain AtLeast 10 Characters"]
    }
})
export const Message = mongoose.model("Message",messageSchema);