import { User } from "../models/userSchema.js";
import { AysncError } from "./catchAsyncError.js";
import ErrorHandler from "./errormiddleware.js";
import jwt from 'jsonwebtoken'

export const isAdminAuthenicated = AysncError(async (req, res, next) => {
    const token = req.cookies.adminToken;
    console.log("Token:", token); // Log the retrieved token

    if (!token) {
        return next(new ErrorHandler("Admin not Authenticated!", 400));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded:", decoded); // Log the decoded payload
    } catch (error) {
        return next(new ErrorHandler("Invalid token!", 401));
    }

    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Admin") {
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403)
        );
    }

    next();
});

export const isPatientAuthenicated = AysncError(async (req, res, next) => {
    const token = req.cookies.patientToken;
    console.log("Token:", token); // Log the retrieved token

    if (!token) {
        return next(new ErrorHandler("Patient not Authenticated", 400));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded:", decoded); // Log the decoded payload
    } catch (error) {
        return next(new ErrorHandler("Invalid token!", 401));
    }

    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Patient") {
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403)
        );
    }

    next();
});
