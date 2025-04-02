import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema(
  {
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
    fastingHours: String,
    lastMealTime: String,
    lastMealType: String,
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
    areaType: String,
    educationLevel: String,
    sampleLocation: String,
    sampleLocationValue: Number,
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "¡Ingresa correctamente tu correo!"],
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
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
    docF: String,
    docName: String,
    vphVaccination: String,
    detectedConditions: String,
    tobaccoConsumption: String,
    cigarettesPerWeekBefore: String,
    cigarettesPerWeekCurrent: String,
    papanicolaouTest: String,
    papanicolaouYear: Number,
    papanicolaouResult: String,
    colposcopy: String,
    colposcopyYear: Number,
    colposcopyResult: String,
    hysterectomy: String,
    hysterectomyReason: String,
    lastMenstruationDate: String,
    firstMenstruationAge: Number,
    sexualRelations: String,
    firstSexualRelationAge: Number,
    sexualPartners: String,
    currentContraceptiveMethod: String,
    oralContraceptiveUsageDuration: String,
    pregnancies: String,
    naturalBirths: Number,
    cesareans: Number,
    abortions: String,
    abortionCount: Number,
    FolioDevelab: Number,
    ClienteDevelab: Number,
    fechaToma: Date,
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
    fecha_lavadowb: Date,
    realizoLavadowb: String,
    fecha_precipitadowb: Date,
    realizoPrecipitadowb: String,
    fechaProceso: Date,
    placaProceso: String,
    resultado4PL: String,
    interpretacionPreventix: String,
    observacionesWB: String,
    observacionesE: String,
    flebotomista: String,
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
