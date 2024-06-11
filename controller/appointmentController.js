import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import moment from 'moment';

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({ success: true, appointments });
});

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ success: true, message: "Appointment Status Updated!" });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({ success: true, message: "Appointment Deleted!" });
});

export const countAppointmentsProcessed = catchAsyncErrors(async (req, res, next) => {
    const processedCount = await Appointment.countDocuments({ tomaProcesada: true });
    res.status(200).json({ success: true, count: processedCount });
});

export const countAppointmentsNotProcessed = catchAsyncErrors(async (req, res, next) => {
    const notProcessedCount = await Appointment.countDocuments({ tomaProcesada: false });
    res.status(200).json({ success: true, count: notProcessedCount });
});

export const countAppointmentsToday = catchAsyncErrors(async (req, res, next) => {
    const today = moment().startOf('day');
    const count = await Appointment.countDocuments({
        createdAt: {
            $gte: today.toDate(),
            $lt: moment(today).endOf('day').toDate()
        }
    });
    res.status(200).json({ success: true, count });
});

export const countProcessedAppointmentsToday = catchAsyncErrors(async (req, res, next) => {
    const today = moment().startOf('day');
    const count = await Appointment.countDocuments({
        createdAt: {
            $gte: today.toDate(),
            $lt: moment(today).endOf('day').toDate()
        },
        tomaProcesada: true
    });
    res.status(200).json({ success: true, count });
});


export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        privacyConsent,
        informedConsent,
        patientFirstName,
        patientLastName,
        birthDate,
        areaType,
        educationLevel,
        sampleLocation,
        email,
        confirmEmail,
        mobilePhone,
        weight,
        height,
        lastMealTime,
        lastMealType,
        docF,
        vphVaccination,
        detectedConditions,
        tobaccoConsumption,
        papanicolaouTest,
        colposcopy,
        hysterectomy,
        lastMenstruationDate,
        firstMenstruationAge,
        sexualRelations,
    } = req.body;

    if (!privacyConsent || !informedConsent || !email || !confirmEmail) {
        return next(new ErrorHandler("Por favor, complete todos los campos obligatorios.", 400));
    }

    const appointment = await Appointment.create(req.body);

    res.status(201).json({ success: true, message: "¡Cita creada con éxito!", appointment });
});
