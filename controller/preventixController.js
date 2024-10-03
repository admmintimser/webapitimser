// src/controller/preventixController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Preventix } from "../models/preventixSchema.js";
import moment from 'moment';

export const getAllPreventix = catchAsyncErrors(async (req, res, next) => {
    const preventix = await Preventix.find().populate("appointmentId");
    res.status(200).json({ success: true, preventix });
});

export const getAllPreventixToday = catchAsyncErrors(async (req, res, next) => {
    const today = moment().startOf('day');
    const preventix = await Preventix.find({
        createdAt: {
            $gte: today.toDate(),
            $lt: moment(today).endOf('day').toDate()
        }
    }).populate("appointmentId");
    res.status(200).json({ success: true, preventix });
});

export const updatePreventixStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let preventix = await Preventix.findById(id);
    if (!preventix) {
        return next(new ErrorHandler("Preventix record not found!", 404));
    }
    preventix = await Preventix.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ success: true, message: "Preventix Status Updated!", preventix });
});

export const deletePreventix = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const preventix = await Preventix.findById(id);
    if (!preventix) {
        return next(new ErrorHandler("Preventix record Not Found!", 404));
    }
    await preventix.deleteOne();
    res.status(200).json({ success: true, message: "Preventix record Deleted!" });
});

export const countPreventixProcessed = catchAsyncErrors(async (req, res, next) => {
    const processedCount = await Preventix.countDocuments({ resultadosEnviados: true });
    res.status(200).json({ success: true, count: processedCount });
});

export const countPreventixNotProcessed = catchAsyncErrors(async (req, res, next) => {
    const notProcessedCount = await Preventix.countDocuments({ resultadosEnviados: false });
    res.status(200).json({ success: true, count: notProcessedCount });
});

export const postPreventix = catchAsyncErrors(async (req, res, next) => {
    const {
        appointmentId,
        tiempoInicioProceso
    } = req.body;

    if (!appointmentId || !tiempoInicioProceso ) {
        return next(new ErrorHandler("Por favor, complete todos los campos obligatorios.", 400));
    }

    const preventix = await Preventix.create(req.body);

    res.status(201).json({ success: true, message: "¡Registro de Preventix creado con éxito!", preventix });
});
