import mongoose from "mongoose";

export const dbConnection= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.error("Error connecting to the database:", err);
    })
}