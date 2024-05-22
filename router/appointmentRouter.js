import express from "express";
import {
    deleteAppointment,
    getAllAppointments,
    postAppointment,
    updateAppointmentStatus,
    countAppointmentsProcessed,
    countAppointmentsNotProcessed
} from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

// Cambiar esta línea para eliminar la autenticación del paciente
router.post("/post", postAppointment); 

router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
router.get('/count/processed', countAppointmentsProcessed);
router.get('/count/not-processed', countAppointmentsNotProcessed);

export default router;
