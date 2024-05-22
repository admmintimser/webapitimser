import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        privacyConsent,
        informedConsent,
        fastingHours,
        lastMealTime,
        lastMealType,
        patientFirstName,
        patientLastName,
        birthDate,
        areaType,
        educationLevel,
        sampleLocation,
        sampleLocationValue,
        email,
        confirmEmail,
        mobilePhone,
        weight,
        height,
        hpvVaccinationStatus,
        medicalConditions,
        smokingStatus,
        weeklyTobaccoConsumption,
        papSmearTestStatus,
        papSmearTestYear,
        lastPapSmearTestYear,
        papSmearTestResult,
        lastPapSmearTestResult,
        papSmearFrequency,
        reasonForNoPapSmear,
        colposcopyStatus,
        lastColposcopyYear,
        colposcopyYear,
        colposcopyResult,
        lastColposcopyResult,
        hysterectomyStatus,
        hysterectomyReason,
        lastMenstruationDate,
        firstMenstruationAge,
        sexualActivityStatus,
        firstSexualRelationAge,
        sexualPartnerCount,
        currentContraceptiveMethod,
        oralContraceptiveDuration,
        pregnancyStatus,
        childbirthCount,
        cesareanCount,
        abortionStatus,
        abortionCount
    } = req.body;

    // Validación de datos
    if (!privacyConsent || !informedConsent || !email || !confirmEmail || email !== confirmEmail) {
        return next(
            new ErrorHandler("Por favor, complete todos los campos obligatorios.", 400)
        );
    }

    // Crea un objeto appointment con los datos recibidos en req.body
    const appointmentData = {
        privacyConsent,
        informedConsent,
        fastingHours,
        lastMealTime,
        lastMealType,
        patientFirstName,
        patientLastName,
        birthDate,
        areaType,
        educationLevel,
        sampleLocation,
        sampleLocationValue,
        email,
        confirmEmail,
        mobilePhone,
        weight,
        height,
        hpvVaccinationStatus,
        medicalConditions,
        smokingStatus,
        weeklyTobaccoConsumption,
        papSmearTestStatus,
        papSmearTestYear,
        lastPapSmearTestYear,
        papSmearTestResult,
        lastPapSmearTestResult,
        papSmearFrequency,
        reasonForNoPapSmear,
        colposcopyStatus,
        lastColposcopyYear,
        colposcopyYear,
        colposcopyResult,
        lastColposcopyResult,
        hysterectomyStatus,
        hysterectomyReason,
        lastMenstruationDate,
        firstMenstruationAge,
        sexualActivityStatus,
        firstSexualRelationAge,
        sexualPartnerCount,
        currentContraceptiveMethod,
        oralContraceptiveDuration,
        pregnancyStatus,
        childbirthCount,
        cesareanCount,
        abortionStatus,
        abortionCount,
        // Remover el ID del paciente ya que no es necesario sin autenticación
    };

    // Crear una nueva cita
    const appointment = await Appointment.create(appointmentData);

    res
        .status(201)
        .json({success: true, message: "¡Cita creada con éxito!", appointment});
});
