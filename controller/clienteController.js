// src/controller/clienteController.js
import { Cliente } from "../models/clienteSchema.js";
import { Preventix } from "../models/preventixSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

export const createCliente = catchAsyncErrors(async (req, res, next) => {
    const { nombre, estado, telefono, correo, idDevellab, preventixComprados, datosFacturacion, lugaresToma } = req.body;
    const cliente = await Cliente.create({ nombre, estado, telefono, correo, idDevellab, preventixComprados, datosFacturacion, lugaresToma });
    res.status(201).json({ success: true, cliente });
});

export const getAllClientes = catchAsyncErrors(async (req, res, next) => {
    const clientes = await Cliente.find();
    res.status(200).json({ success: true, clientes });
});

export const getClienteById = catchAsyncErrors(async (req, res, next) => {
    const cliente = await Cliente.findById(req.params.id).populate("preventix");
    if (!cliente) {
        return next(new ErrorHandler("Cliente no encontrado", 404));
    }
    res.status(200).json({ success: true, cliente });
});

export const updateCliente = catchAsyncErrors(async (req, res, next) => {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cliente) {
        return next(new ErrorHandler("Cliente no encontrado", 404));
    }
    res.status(200).json({ success: true, cliente });
});

export const deleteCliente = catchAsyncErrors(async (req, res, next) => {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
        return next(new ErrorHandler("Cliente no encontrado", 404));
    }
    await cliente.deleteOne();
    res.status(200).json({ success: true, message: "Cliente eliminado" });
});

export const countPreventixByCliente = catchAsyncErrors(async (req, res, next) => {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
        return next(new ErrorHandler("Cliente no encontrado", 404));
    }
    const preventixCount = await Preventix.countDocuments({ _id: { $in: cliente.preventix } });
    res.status(200).json({ success: true, count: preventixCount });
});

export const countPreventixByEstatus = catchAsyncErrors(async (req, res, next) => {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
        return next(new ErrorHandler("Cliente no encontrado", 404));
    }
    const preventixByEstatus = await Preventix.aggregate([
        { $match: { _id: { $in: cliente.preventix } } },
        { $group: { _id: "$estatusMuestra", count: { $sum: 1 } } }
    ]);
    res.status(200).json({ success: true, statusCount: preventixByEstatus });
});
