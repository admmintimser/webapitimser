// receptionSchema.js
import mongoose from "mongoose";

const receptionSchema = new mongoose.Schema({
    nmuestras: {
        type: Number,
        required: true
    },
    fechaingreso: {
        type: Date,
        required: true
    },
    temperatura: {
        type: Number,
        required: true
    },
    recepcionista: {
        type: String,
        required: true
    },
    pruebasbien: {
        type: Number,
        required: true
    },
    pruebaslipemicas: {
        type: Number,
        required: true
    },
    pruebashemolizadas: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Reception = mongoose.model("Reception", receptionSchema);
