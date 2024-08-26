import jwt from "jsonwebtoken"
export const generateToken = (user,message,statuscode,res)=>{

    const token = user.generateJsonWebToken();
    // console.log("Generated Token:", token);
    const cookieName = user.role === "Admin" ? "adminToken":"patientToken";

    res.status(statuscode).cookie(cookieName,token,{
        expires:new Date(Date.now() + 24*60*60*1000),
        httpOnly:true
        

    }).json({
        success:true,
        message,
        user,
        token
    })

}