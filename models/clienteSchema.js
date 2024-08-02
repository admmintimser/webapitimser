// src/models/clienteSchema.js
import mongoose from "mongoose";
import validator from "validator";

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: "Correo inválido"
        }
    },
    idDevellab: {
        type: Number,
        required: true
    },
    preventixComprados: {
        type: Number,
        required: true
    },
    datosFacturacion: {
        type: String,
    },
    lugaresToma: [{ // Nuevo campo para lugares de toma
        type: String,
    }],
    preventix: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Preventix"
    }]
}, { timestamps: true });

export const Cliente = mongoose.model("Cliente", clienteSchema);
