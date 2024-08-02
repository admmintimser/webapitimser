// receptionController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Reception } from "../models/receptionSchema.js";
import moment from 'moment';

export const getAllReceptions = catchAsyncErrors(async (req, res, next) => {
    const receptions = await Reception.find();
    res.status(200).json({ success: true, receptions });
});

export const getAllReceptionsToday = catchAsyncErrors(async (req, res, next) => {
    const today = moment().startOf('day');
    const receptions = await Reception.find({
        createdAt: {
            $gte: today.toDate(),
            $lt: moment(today).endOf('day').toDate()
        }
    });
    res.status(200).json({ success: true, receptions });
});

export const updateReceptionStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let reception = await Reception.findById(id);
    if (!reception) {
        return next(new ErrorHandler("Reception not found!", 404));
    }
    reception = await Reception.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ success: true, message: "Reception Status Updated!" });
});

export const deleteReception = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const reception = await Reception.findById(id);
    if (!reception) {
        return next(new ErrorHandler("Reception Not Found!", 404));
    }
    await reception.deleteOne();
    res.status(200).json({ success: true, message: "Reception Deleted!" });
});

export const countReceptionsProcessed = catchAsyncErrors(async (req, res, next) => {
    const processedCount = await Reception.countDocuments({ pruebasbien: { $gt: 0 } });
    res.status(200).json({ success: true, count: processedCount });
});

export const countReceptionsNotProcessed = catchAsyncErrors(async (req, res, next) => {
    const notProcessedCount = await Reception.countDocuments({ pruebasbien: 0 });
    res.status(200).json({ success: true, count: notProcessedCount });
});

export const postReception = catchAsyncErrors(async (req, res, next) => {
    const {
        nmuestras,
        fechaingreso,
        temperatura,
        recepcionista,
        pruebasbien,
        pruebaslipemicas,
        pruebashemolizadas,
    } = req.body;

    if (!nmuestras || !fechaingreso || !temperatura || !recepcionista || !pruebasbien || !pruebaslipemicas || !pruebashemolizadas) {
        return next(new ErrorHandler("Por favor, complete todos los campos obligatorios.", 400));
    }

    const reception = await Reception.create(req.body);

    res.status(201).json({ success: true, message: "¡Recepción creada con éxito!", reception });
});
