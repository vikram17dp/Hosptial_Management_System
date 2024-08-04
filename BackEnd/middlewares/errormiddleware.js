class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode;
    }
}
export const errorMidlleware = (err,req,res,next)=>{
    err.message = err.message || "internal server error"
    err.statuscode = err.statuscode || 500
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === "JsonWebToken"){
        const message = "Json Web Token is invalid,Tryagain!"
        err = new ErrorHandler(message,400);
    }
    if(err.name === "TokenExperiedError"){
        const message = "Json Web Token is experied,Tryagain!"
        err = new ErrorHandler(message,400);
    }
    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    const errormessage = err.errors ? Object.values(err.errors).map((error)=>error.message).join(" ") : err.message;
    return res.status(err.statuscode).json({
        sucess:false,
        message:errormessage
    })
}
export default ErrorHandler;