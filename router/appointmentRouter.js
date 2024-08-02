import express from "express";
import {
    deleteAppointment,
    getAllAppointments,
    getAppointmentById, // Importa la función para obtener los detalles de una cita
    postAppointment,
    updateAppointmentStatus,
    countAppointmentsProcessed,
    countAppointmentsNotProcessed,
    countAppointmentsToday,
    countProcessedAppointmentsToday,
    getAllAppointmentsToday
} from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

// Rutas existentes
router.post("/post", postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
router.get('/count/processed', countAppointmentsProcessed);
router.get('/count/not-processed', countAppointmentsNotProcessed);
router.get('/count/today', countAppointmentsToday);
router.get('/count/today-processed', countProcessedAppointmentsToday);

// Nueva ruta para obtener todas las citas de hoy
router.get('/getall/today', isAdminAuthenticated, getAllAppointmentsToday);

// Nueva ruta para obtener los detalles de una cita por ID
// appointmentRouter.js
router.get('/appointment/:id', getAppointmentById); // Temporalmente sin autenticación para depuración


export default router;
