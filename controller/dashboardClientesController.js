// src/controller/dashboardclientesController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Preventix } from "../models/preventixSchema.js";
import { Cliente } from "../models/clienteSchema.js";
import moment from 'moment';

export const getDashboardData = catchAsyncErrors(async (req, res, next) => {
    const preventix = await Preventix.find().populate("appointmentId");

    const sampleLocationCounts = preventix.reduce((acc, p) => {
        const location = p.appointmentId.sampleLocation || "Unknown";
        acc[location] = (acc[location] || 0) + 1;
        return acc;
    }, {});

    const statusCounts = {
        estatusTomaMuestraTrue: await Preventix.countDocuments({ estatusTomaMuestra: true }),
        estatusTomaMuestraFalse: await Preventix.countDocuments({ estatusTomaMuestra: false }),
        estatusRecepcionTrue: await Preventix.countDocuments({ estatusRecepcion: true }),
        estatusRecepcionFalse: await Preventix.countDocuments({ estatusRecepcion: false }),
        estatusELisaTrue: await Preventix.countDocuments({ estatusELisa: true }),
        estatusELisaFalse: await Preventix.countDocuments({ estatusELisa: false }),
        estatusWBTrue: await Preventix.countDocuments({ estatusWB: true }),
        estatusWBFalse: await Preventix.countDocuments({ estatusWB: false }),
        estatusValidacionTrue: await Preventix.countDocuments({ estatusValidacion: true }),
        estatusValidacionFalse: await Preventix.countDocuments({ estatusValidacion: false }),
        estatusLiberacionTrue: await Preventix.countDocuments({ estatusLiberacion: true }),
        estatusLiberacionFalse: await Preventix.countDocuments({ estatusLiberacion: false }),
        resultadosEnviadosTrue: await Preventix.countDocuments({ resultadosEnviados: true }),
        resultadosEnviadosFalse: await Preventix.countDocuments({ resultadosEnviados: false }),
    };

    const clientes = await Cliente.find();
    const sampleLocationByClient = {};

    clientes.forEach(cliente => {
        cliente.lugaresToma.forEach(location => {
            sampleLocationByClient[location] = sampleLocationByClient[location] || [];
            sampleLocationByClient[location].push(cliente.nombre);
        });
    });

    const sampleLocationByClientCounts = {};
    Object.keys(sampleLocationByClient).forEach(location => {
        sampleLocationByClientCounts[location] = sampleLocationCounts[location] || 0;
    });

    res.status(200).json({ 
        success: true, 
        sampleLocationCounts, 
        statusCounts,
        sampleLocationByClientCounts,
        sampleLocationByClient 
    });
});
