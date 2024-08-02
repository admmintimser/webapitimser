// preventixSchema.js
import mongoose from "mongoose";

const preventixSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    tiempoInicioProceso: {
        type: Date,
        required: true
    },
    estatusMuestra: {
        type: String,
    },
    tiempoFinProceso: {
        type: Date,
    },
    temperatura: {
        type: String,
    },
    folioDevelab: {
        type: String,
    },
    interpretacionPreventix: {
        type: String,
    },
    estatusWesternBlot: {
        type: String,
    },
    lavoWestern: {
        type: String,
    },
    fechaPrecipitado: {
        type: Date,
    },
    fechaLavado: {
        type: Date,
    },
    tecnicoWB: {
        type: String,
    },
    resultadoWesternBlot: {
        type: String,
    },
    estatusElisa: {
        type: String,
    },
    lavoElisa: {
        type: String,
    },
    numeroPlaca: {
        type: String,
    },
    lugarProceso: {
        type: String,
    },
    resultadoElisa: {
        type: String,
    },
    estatusTomaMuestra: {
        type: Boolean,
        default: false
    },
    estatusRecepcion: {
        type: Boolean,
        default: false
    },
    estatusELisa: {
        type: Boolean,
        default: false
    },
    estatusWB: {
        type: Boolean,
        default: false
    },
    estatusValidacion: {
        type: Boolean,
        default: false
    },
    estatusLiberacion: {
        type: Boolean,
        default: false
    },
    resultadosEnviados: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Preventix = mongoose.model("Preventix", preventixSchema);
