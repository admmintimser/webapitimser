import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import moment from "moment";

// Helper para obtener inicio y fin del día
const getDayBounds = (date = moment()) => ({
  start: date.startOf("day").toDate(),
  end: date.endOf("day").toDate(),
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find().lean();
  res.status(200).json({ success: true, appointments });
});

export const getAllAppointmentsToday = catchAsyncErrors(async (req, res, next) => {
  const { start, end } = getDayBounds(moment());
  const appointments = await Appointment.find({
    createdAt: { $gte: start, $lt: end },
  }).lean();
  res.status(200).json({ success: true, appointments });
});

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Appointment Status Updated!",
    appointment: updatedAppointment,
  });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({ success: true, message: "Appointment Deleted!" });
});

export const countAppointmentsProcessed = catchAsyncErrors(async (req, res, next) => {
  const count = await Appointment.countDocuments({ tomaProcesada: true });
  res.status(200).json({ success: true, count });
});

export const countAppointmentsNotProcessed = catchAsyncErrors(async (req, res, next) => {
  const count = await Appointment.countDocuments({ tomaProcesada: false });
  res.status(200).json({ success: true, count });
});

export const countAppointmentsToday = catchAsyncErrors(async (req, res, next) => {
  const { start, end } = getDayBounds(moment());
  const count = await Appointment.countDocuments({
    createdAt: { $gte: start, $lt: end },
  });
  res.status(200).json({ success: true, count });
});

export const countProcessedAppointmentsToday = catchAsyncErrors(async (req, res, next) => {
  const { start, end } = getDayBounds(moment());
  const count = await Appointment.countDocuments({
    createdAt: { $gte: start, $lt: end },
    tomaProcesada: true,
  });
  res.status(200).json({ success: true, count });
});

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const { privacyConsent, informedConsent, email, confirmEmail } = req.body;
  if (!privacyConsent || !informedConsent || !email || !confirmEmail) {
    return next(
      new ErrorHandler("Por favor, complete todos los campos obligatorios.", 400)
    );
  }
  const appointment = await Appointment.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "¡Cita creada con éxito!", appointment });
});

export const getAppointmentById = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  res.status(200).json({ success: true, appointment });
});

export const getAppointmentsDashboard = catchAsyncErrors(async (req, res, next) => {
  // Obtiene citas desde hace 2 días hasta el final del día actual
  const startDate = moment().subtract(2, "days").startOf("day").toDate();
  const endDate = moment().endOf("day").toDate();
  const appointments = await Appointment.find({
    createdAt: { $gte: startDate, $lte: endDate },
  }).lean();
  res.status(200).json({ success: true, appointments });
});
