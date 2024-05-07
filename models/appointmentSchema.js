import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    privacyConsent: {
        type: Boolean,
        required: true,
    },
    informedConsent: {
        type: Boolean,
        required: true,
    },
    fasting:{
        type: String,
    },
    fastingHours: {
        type: Number,
        required: true,
        min: 0,
    },
    lastMealTime: {
        type: Date,
        required: true,
    },
    lastMealType: {
        type: String,
        required: true,
    },
    patientFirstName: {
        type: String,
        required: true,
    },
    patientLastName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    areaType: {
        type: String,
        required: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    sampleLocation: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Ingresa correctamente tu correo!"],
    },
    confirmEmail: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Ingresa correctamente tu correo!"],
    },
    mobilePhone: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    height: {
        type: Number,
        required: true,
        min: 0,
    },
    vphVaccination: {
        type: String,
    },
    detectedConditions: {
        type: String,
    },
    tobaccoConsumption: {
        type: String,
    },
    cigarettesPerWeekBefore: {
        type: String,
    },
    cigarettesPerWeekCurrent: {
        type: String,
    },
    papanicolaouTest: {
        type: String,
    },
    papanicolaouYear: {
        type: Number,
    },
    papanicolaouResult: {
        type: String,
    },
    colposcopy: {
        type: String,
    },
    colposcopyYear: {
        type: Number,
    },
    colposcopyResult: {
        type: String,
    },
    hysterectomy: {
        type: String,
    },
    hysterectomyReason: {
        type: String,
    },
    lastMenstruationDate: {
        type: Date,
    },
    firstMenstruationAge: {
        type: Number,
    },
    sexualRelations: {
        type: String,
    },
    firstSexualRelationAge: {
        type: Number,
    },
    sexualPartners: {
        type: String,
    },
    currentContraceptiveMethod: {
        type: String,
    },
    oralContraceptiveUsageDuration: {
        type: String,
    },
    pregnancies: {
        type: String,
    },
    naturalBirths: {
        type: Number,
    },
    cesareans: {
        type: Number,
    },
    abortions: {
        type: String,
    },
    abortionCount: {
        type: Number,
    },
    FolioDevelab: {
        type: String,
    },
    fechaToma: {
        type: Date,
    },
    tomaRecibida: {
        type: Boolean,
        default: false,
    },
    tomaProcesada: {
        type: Boolean,
        default: false,
    },
    tomaEnviada: {
        type: Boolean,
        default: false,
    },
    tomaEntregada: {
        type: Boolean,
        default: false,
    },
    fecha_lavadowb: {
        type: Date,
    },
    realizoLavadowb: {
        type: String,
    },
    fecha_precipitadowb: {
        type: Date,
    },
    realizoPrecipitadowb: {
        type: String,
    },
    fechaProceso: {
        type: Date,
    },
    placaProceso: {
        type: String,
    },
    resultado4PL: {
        type: String,
    },
    interpretacionPreventix: {
        type: String,
    },
    observacionesWB: {
        type: String,
    },
    observacionesE: {
        type: String,
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
