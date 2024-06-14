import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    privacyConsent: {
        type: Boolean,
        required: true,
        default: false,
    },
    informedConsent: {
        type: Boolean,
        required: true,
        default: false,
    },
    fastingHours: {
        type: String,
    },
    lastMealTime: {
        type: Date,
    },
    lastMealType: {
        type: String,
    },
    patientFirstName: {
        type: String,
        required: true
    },
    patientLastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    areaType: {
        type: String,
    },
    educationLevel: {
        type: String,
    },
    sampleLocation: {
        type: String,
    },
    sampleLocationValue: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Ingresa correctamente tu correo!"]
    },
    confirmEmail: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Ingresa correctamente tu correo!"]
    },
    mobilePhone: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        min: 0
    },
    height: {
        type: Number,
        min: 0
    },
    docF:{
        type: String,
    },
    docName:{
        type: String
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
        type: Number
    },
    papanicolaouResult: {
        type: String,
    },
    colposcopy: {
        type: String,
    },
    colposcopyYear: {
        type: Number
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
        type: String,
       
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
        type: Number
    },
    cesareans: {
        type: Number
    },
    abortions: {
        type: String,
        
    },
    abortionCount: {
        type: Number
    },
    FolioDevelab: {
        type: Number
    },
    ClienteDevelab: {
        type: Number
    },
    fechaToma: {
        type: Date
    },
    tomaRecibida: {
        type: Boolean,
        default: false
    },
    tomaProcesada: {
        type: Boolean,
        default: false
    },
    tomaEnviada: {
        type: Boolean,
        default: false
    },
    tomaEntregada: {
        type: Boolean,
        default: false
    },
    fecha_lavadowb: {
        type: Date
    },
    realizoLavadowb: {
        type: String
    },
    fecha_precipitadowb: {
        type: Date
    },
    realizoPrecipitadowb: {
        type: String
    },
    fechaProceso: {
        type: Date
    },
    placaProceso: {
        type: String
    },
    resultado4PL: {
        type: String
    },
    interpretacionPreventix: {
        type: String
    },
    observacionesWB: {
        type: String
    },
    observacionesE: {
        type: String
    },
    flebotomista: {
        type: String
    }
}, { timestamps: true }); // Añadido timestamps

export const Appointment = mongoose.model("Appointment", appointmentSchema);
