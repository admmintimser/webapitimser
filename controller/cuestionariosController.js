import { Cuestionarios } from "../models/cuestionariosSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// Obtener todos los cuestionarios
export const getAllCuestionarios = catchAsyncErrors(async (req, res, next) => {
    const cuestionarios = await Cuestionario.find();
    res.status(200).json({ success: true, cuestionarios });
});

// Obtener cuestionario por ID
export const getCuestionarioById = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
        return next(new ErrorHandler("Cuestionario no encontrado", 404));
    }
    res.status(200).json({ success: true, cuestionario });
});

// Crear un nuevo cuestionario
export const createCuestionario = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.create(req.body);
    res.status(201).json({ success: true, message: "Cuestionario creado con éxito", cuestionario });
});

// Actualizar cuestionario
export const updateCuestionario = catchAsyncErrors(async (req, res, next) => {
    let cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
        return next(new ErrorHandler("Cuestionario no encontrado", 404));
    }
    cuestionario = await Cuestionario.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({ success: true, message: "Cuestionario actualizado", cuestionario });
});

// Eliminar cuestionario
export const deleteCuestionario = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
        return next(new ErrorHandler("Cuestionario no encontrado", 404));
    }
    await cuestionario.remove();
    res.status(200).json({ success: true, message: "Cuestionario eliminado" });
});
