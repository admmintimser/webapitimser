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
        type: Number,
        required: true,
        min: 0
    },
    lastMealTime: {
        type: Date,
        required: true
    },
    lastMealType: {
        type: String,
        required: true
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
        required: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    sampleLocation: {
        type: String,
        required: true
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
        required: true,
        min: 0
    },
    height: {
        type: Number,
        required: true,
        min: 0
    },
    vphVaccination: {
        type: String,
        enum: ['Sí, recibí 1 dosis', 'Sí, recibí 2 dosis', 'Sí, recibí 3 dosis', 'Sí, no recuerdo cuántas dosis recibí', 'No', 'No recuerdo'],
    },
    detectedConditions: {
        type: String,
        enum: ['Cáncer', 'Diabetes', 'Hipertensión', 'Enfermedad Tiroidea', 'Enfermedad del sistema inmune', 'Infecciones de transmisión sexual no virales', 'Infecciones de transmisión sexual virales', 'Virus del papiloma humano', 'Nunca me han aplicado ninguna de estas pruebas de detección', 'No recuerdo'],
    },
    tobaccoConsumption: {
        type: String,
        enum: ['Sí, fumé un tiempo pero ya lo dejé', 'Sí, actualmente sigo fumando', 'No, nunca he fumado'],
    },
    cigarettesPerWeekBefore: {
        type: String,
        enum: ['De 1-35 cigarrillos por semana (5 diarios)', 'De 36-105 cigarrillos por semana (6-15 diarios)', '106 cigarrillos o más por semana (16 o más diarios)'],
    },
    cigarettesPerWeekCurrent: {
        type: String,
        enum: ['De 1-35 cigarrillos por semana (5 diarios)', 'De 36-105 cigarrillos por semana (6-15 diarios)', '106 cigarrillos o más por semana (16 o más diarios)'],
    },
    papanicolaouTest: {
        type: String,
        enum: ['Sí, sólo 1 vez', 'Sí, 2 veces o más', 'No, nunca', 'No recuerdo'],
    },
    papanicolaouYear: {
        type: Number
    },
    papanicolaouResult: {
        type: String,
        enum: ['Negativo a lesión y/o cáncer (sana)', 'Negativo a lesión/cáncer con proceso inflamatorio', 'Negativo a lesión/cáncer con infección', 'Displasia leve NIC-1', 'Displasia moderada NIC-2', 'Displasia severa NIC-3', 'Cáncer cervicouterino', 'No recuerdo', 'No recibí mi resultado'],
    },
    colposcopy: {
        type: String,
        enum: ['Sí, 1 vez', 'Sí, 2 o más veces', 'No, nunca', 'No recuerdo'],
    },
    colposcopyYear: {
        type: Number
    },
    colposcopyResult: {
        type: String,
        enum: ['Sin alteraciones', 'Alteraciones inflamatorias inespecíficas', 'Virus del papiloma humano', 'Displasia leve', 'Displasia moderada', 'Displasia grave', 'Cáncer', 'Otros', 'No recuerdo'],
    },
    hysterectomy: {
        type: String,
        enum: ['Sí', 'No'],
    },
    hysterectomyReason: {
        type: String,
        enum: ['Por razones clínicas distintas al cáncer', 'Porque tenía cáncer de ovario', 'Porque tenía cáncer de endometrio', 'Porque tenía cáncer cervicouterino', 'Por otras razones', 'No recuerdo'],
    },
    lastMenstruationDate: {
        type: Date,
        required: true,
        enum: ['Recientemente', 'Ya no la tengo (menopausia)', 'Prefiero no contestar'],
    },
    firstMenstruationAge: {
        type: Number,
        required: true,
    },
    sexualRelations: {
        type: String,
        enum: ['Sí', 'No', 'Prefiero no contestar'],
    },
    firstSexualRelationAge: {
        type: Number,
        required: true,
    },
    sexualPartners: {
        type: String,
        enum: ['1', '2', '3', '4 o más', 'Prefiero no contestar'],
    },
    currentContraceptiveMethod: {
        type: String,
        enum: ['Condón', 'Anticonceptivos orales', 'Anticonceptivos inyectables', 'Parche anticonceptivo', 'DIU hormonal', 'DIU de cobre', 'Píldora del día siguiente', 'Ligación de trompas de Falopio', 'Ninguno', 'Coito interrumpido', 'No recuerdo', 'Prefiero no contestar'],
    },
    oralContraceptiveUsageDuration: {
        type: String,
        enum: ['Menos de 1 año', '1 año o más, pero menos de 2 años', '2 años o más, pero menos de 3 años', '3 años o más', 'No recuerdo'],
    },
    pregnancies: {
        type: String,
        enum: ['Sí', 'No'],
    },
    naturalBirths: {
        type: Number
    },
    cesareans: {
        type: Number
    },
    abortions: {
        type: String,
        enum: ['Sí', 'No'],
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
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
