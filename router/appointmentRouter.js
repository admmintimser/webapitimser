// router.js
import express from "express";
import {
    deleteAppointment,
    getAllAppointments,
    postAppointment,
    updateAppointmentStatus,
    countAppointmentsProcessed,
    countAppointmentsNotProcessed,
    countAppointmentsToday,
    countProcessedAppointmentsToday,
    getAllAppointmentsToday // Make sure to import the new function
} from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

// Existing routes
router.post("/post", postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
router.get('/count/processed', countAppointmentsProcessed);
router.get('/count/not-processed', countAppointmentsNotProcessed);
router.get('/count/today', countAppointmentsToday);
router.get('/count/today-processed', countProcessedAppointmentsToday);

// New route for getting all today's appointments
router.get('/getall/today', isAdminAuthenticated, getAllAppointmentsToday);

export default router;
