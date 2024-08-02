// src/controller/cuestionarioController.js
import { Cuestionario } from "../models/cuestionarioSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// Crear Cuestionario
export const createCuestionario = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.create(req.body);
    res.status(201).json({ success: true, cuestionario });
});

// Obtener todos los Cuestionarios
export const getAllCuestionarios = catchAsyncErrors(async (req, res, next) => {
    const cuestionarios = await Cuestionario.find();
    res.status(200).json({ success: true, cuestionarios });
});

// Obtener Cuestionario por ID
export const getCuestionarioById = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
        return next(new ErrorHandler("Cuestionario no encontrado", 404));
    }
    res.status(200).json({ success: true, cuestionario });
});

// Actualizar Cuestionario
export const updateCuestionario = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cuestionario) {
        return next(new ErrorHandler("Cuestionario no encontrado", 404));
    }
    res.status(200).json({ success: true, cuestionario });
});

// Eliminar Cuestionario
export const deleteCuestionario = catchAsyncErrors(async (req, res, next) => {
    const cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
        return next(new ErrorHandler("Cuestionario no encontrado", 404));
    }
    await cuestionario.deleteOne();
    res.status(200).json({ success: true, message: "Cuestionario eliminado" });
});

export const bulkUploadCuestionarios = catchAsyncErrors(async (req, res, next) => {
    const { cuestionarios } = req.body;
    if (!cuestionarios || !Array.isArray(cuestionarios)) {
        return next(new ErrorHandler("Formato de datos incorrecto", 400));
    }
    const createdCuestionarios = await Cuestionario.insertMany(cuestionarios);
    res.status(201).json({ success: true, createdCuestionarios });
});