import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true, "Nombre necesario!"
        ],
        minLength: [3, "Nombre debe de contener al menos 3 caracteres."]
    },
    lastName: {
        type: String,
        required: [
            true, "Apellido Necesario!"
        ],
        minLength: [3, "Apellido debe de contener al menos 3 caracteres!"]
    },
    email: {
        type: String,
        required: [
            true, "Correo necesario!"
        ],
        validate: [validator.isEmail, "Ingresa un correo correcto!"]
    },
    phone: {
        type: String,
        minLength: [10, "El teléfono debe de contener al menos 10 digitos!"]
    },
    dob: {
        type: Date
    },
    nic: {
        type: String
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: [
            true, "Contraseña necesaria!"
        ],
        minLength: [
            8, "La contraseña debe de tener al menos 8 caracteres!"
        ],
        select: false
    },
    role: {
        type: String,
        enum: ["Admin", "Doctor", "Patient", "Receptionist", "Elisas", "Westernblot", "Direccion", "Comercial", "Cliente", "AdminLab"],
        required: true
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES});
};

export const User = mongoose.model("User", userSchema);
