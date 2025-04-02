import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

// Función genérica para agregar un nuevo usuario basado en el rol


// Registro de usuarios específicos
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Patient";
    addNewUser(req, res, next);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Admin";
    addNewUser(req, res, next);
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Doctor";
    addNewUser(req, res, next);
});

export const addNewReceptionist = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Receptionist";
    addNewUser(req, res, next);
});

export const addNewElisas = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Elisas";
    addNewUser(req, res, next);
});

export const addNewWesternblot = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Westernblot";
    addNewUser(req, res, next);
});

export const addNewDireccion = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Direccion";
    addNewUser(req, res, next);
});

export const addNewComercial = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Comercial";
    addNewUser(req, res, next);
});

export const addNewCliente = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "Cliente";
    addNewUser(req, res, next);
});

export const addNewAdminLab = catchAsyncErrors(async (req, res, next) => {
    req.body.role = "AdminLab";
    addNewUser(req, res, next);
});

// Login de usuario
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    generateToken(user, "Login Successfully!", 201, res);
});

// Obtener detalles del usuario actual
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({ success: true, user });
});

// Obtener todos los usuarios de un rol específico
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({ success: true, doctors });
});

export const getAllReceptionists = catchAsyncErrors(async (req, res, next) => {
    const receptionists = await User.find({ role: "Receptionist" });
    res.status(200).json({ success: true, receptionists });
});

// Añadir más funciones `getAll` para otros roles según sea necesario
// Función genérica para agregar un nuevo usuario basado en el rol
export const addNewUser = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role // Nuevo campo para seleccionar el rol del usuario
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("User with this Email Already Exists!", 400));
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role
    });

    res.status(200).json({ success: true, message: `New ${role} Registered`, user });
});
// Logout
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(201)
        .cookie("adminToken", "", { httpOnly: true, expires: new Date(Date.now()) })
        .json({ success: true, message: "Admin Logged Out Successfully." });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(201)
        .cookie("patientToken", "", { httpOnly: true, expires: new Date(Date.now()) })
        .json({ success: true, message: "Patient Logged Out Successfully." });
});

// Contar pacientes
export const countPatients = catchAsyncErrors(async (req, res, next) => {
    const patientCount = await User.countDocuments({ role: 'Patient' });
    res.status(200).json({ success: true, count: patientCount });
});

export const getCurrentUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new ErrorHandler("User not authenticated!", 401));
    }
    res.status(200).json({ success: true, user });
});
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.status(201)
        .clearCookie("adminToken") // Borra el token del admin
        .clearCookie("patientToken") // Borra el token del paciente
        .clearCookie("receptionToken") // Borra el token del recepcionista
        .json({ success: true, message: "Logged Out Successfully." });
});
