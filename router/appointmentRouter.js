import express from "express";
import {
    deleteAppointment,
    getAllAppointments,
    getAppointmentById,
    postAppointment,
    updateAppointmentStatus,
    countAppointmentsProcessed,
    countAppointmentsNotProcessed,
    countAppointmentsToday,
    countProcessedAppointmentsToday,
    getAllAppointmentsToday
} from "../controller/appointmentController.js";
import { hasRoles } from "../middlewares/auth.js";

const router = express.Router();

// Rutas existentes
router.post("/post", postAppointment); // Cualquier usuario autenticado puede crear una cita
router.get("/getall", hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getAllAppointments); // Verificación de roles específicos
router.put("/update/:id", hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), updateAppointmentStatus); // Verificación de roles específicos
router.delete("/delete/:id", hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), deleteAppointment); // Verificación de roles específicos
router.get('/count/processed', hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countAppointmentsProcessed); // Verificación de roles específicos
router.get('/count/not-processed', hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countAppointmentsNotProcessed); // Verificación de roles específicos
router.get('/count/today', hasRoles('Admin', 'Receptionist', 'AdminLab', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countAppointmentsToday); // Verificación de roles específicos
router.get('/count/today-processed', hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countProcessedAppointmentsToday); // Verificación de roles específicos

// Nueva ruta para obtener todas las citas de hoy
router.get('/getall/today', hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getAllAppointmentsToday); // Verificación de roles específicos

// Nueva ruta para obtener los detalles de una cita por ID
router.get('/appointment/:id', getAppointmentById); // Cualquier usuario autenticado puede ver detalles

export default router;
