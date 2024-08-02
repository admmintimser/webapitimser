import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import {User} from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import {generateToken} from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password
    } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({email});
    if (isRegistered) {
        return next(new ErrorHandler("User already Registered!", 400));
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Patient"
    });
    generateToken(user, "User Registered!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    
    const user = await User
        .findOne({email})
        .select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    generateToken(user, "Login Successfully!", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password
    } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({email});
    if (isRegistered) {
        return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
    }

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Admin"
    });
    res
        .status(200)
        .json({success: true, message: "New Admin Registered", admin});
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        nic
    } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !nic) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({email});
    if (isRegistered) {
        return next(new ErrorHandler("Este cliente ya existe!", 400));
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        nic,
        role: "Doctor"
    });
    res
        .status(200)
        .json({success: true, message: "New Doctor Registered", doctor});
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res
        .status(200)
        .json({success: true, doctors});
});
export const getAllFlebos = catchAsyncErrors(async (req, res, next) => {
    const flebos = await User.find({role: "Flebo"});
    res
        .status(200)
        .json({success: true, flebos});
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res
        .status(200)
        .json({success: true, user});
});

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
        .status(201)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({success: true, message: "Admin Logged Out Successfully."});
});

// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
        .status(201)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({success: true, message: "Patient Logged Out Successfully."});
});
export const countPatients = catchAsyncErrors(async (req, res, next) => {
    const patientCount = await User.countDocuments({role: 'Patient'});
    res
        .status(200)
        .json({success: true, count: patientCount});
});

export const addNewFlebo = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password
    } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new ErrorHandler("Llena todos los campos!", 400));
    }

    const isRegistered = await User.findOne({email});
    if (isRegistered) {
        return next(new ErrorHandler("Ya existe!", 400));
    }

    const flebo = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Flebo"
    });
    res
        .status(200)
        .json({success: true, message: "New Flebo", flebo});
});