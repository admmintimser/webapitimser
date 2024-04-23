import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
      privacyConsent, informedConsent, fastingHours, lastMealTime, lastMealType,
      patientFirstName, patientLastName, birthDate,
      areaType, educationLevel, sampleLocation,
      email, confirmEmail, mobilePhone, weight, height, hpvVaccinationStatus, medicalConditions,
      smokingStatus, weeklyTobaccoConsumption, papSmearTestStatus, papSmearTestYear,
      lastPapSmearTestYear, papSmearTestResult, lastPapSmearTestResult, papSmearFrequency,
      reasonForNoPapSmear, colposcopyStatus, lastColposcopyYear, colposcopyYear, colposcopyResult,
      lastColposcopyResult, hysterectomyStatus, hysterectomyReason, lastMenstruationDate,
      firstMenstruationAge, sexualActivityStatus, firstSexualRelationAge, sexualPartnerCount,
      currentContraceptiveMethod, oralContraceptiveDuration, pregnancyStatus, childbirthCount,
      cesareanCount, abortionStatus, abortionCount
  } = req.body;

  // Verificación de autenticación
  if (!req.user || !req.user._id) {
      return next(new ErrorHandler("Usuario no autenticado", 401));
  }

  // Validación de datos
  if (!privacyConsent || !informedConsent || !email || !confirmEmail || email !== confirmEmail) {
      return next(new ErrorHandler("Por favor, complete todos los campos obligatorios.", 400));
  }

  // Crea un objeto appointment con los datos recibidos en req.body
  const appointmentData = {
      privacyConsent, informedConsent, fastingHours, lastMealTime, lastMealType,
      patientFirstName, patientLastName, birthDate,
      areaType, educationLevel, sampleLocation,
      email,confirmEmail, mobilePhone, weight, height, hpvVaccinationStatus, medicalConditions,
      smokingStatus, weeklyTobaccoConsumption, papSmearTestStatus, papSmearTestYear,
      lastPapSmearTestYear, papSmearTestResult, lastPapSmearTestResult, papSmearFrequency,
      reasonForNoPapSmear, colposcopyStatus, lastColposcopyYear, colposcopyYear, colposcopyResult,
      lastColposcopyResult, hysterectomyStatus, hysterectomyReason, lastMenstruationDate,
      firstMenstruationAge, sexualActivityStatus, firstSexualRelationAge, sexualPartnerCount,
      currentContraceptiveMethod, oralContraceptiveDuration, pregnancyStatus, childbirthCount,
      cesareanCount, abortionStatus, abortionCount,
      patientId: req.user._id // Asignar el ID del paciente
  };

  // Crear una nueva cita
  const appointment = await Appointment.create(appointmentData);

  res.status(201).json({
      success: true,
      message: "¡Cita creada con éxito!",
      appointment
  });
});


export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
