import express from "express";
import {
    deletePreventix,
    getAllPreventix,
    postPreventix,
    updatePreventixStatus,
    countPreventixProcessed,
    countPreventixNotProcessed,
    getAllPreventixToday
} from "../controller/preventixController.js";
import { hasRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), postPreventix); // Receptionist y Admin pueden crear
router.get("/getall", hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getAllPreventix); // Admin, Receptionist, Doctor, Elisas pueden obtener todos
router.put("/update/:id", hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), updatePreventixStatus); // Admin y Receptionist pueden actualizar
router.delete("/delete/:id", hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), deletePreventix); // Solo Admin puede borrar
router.get('/count/processed', hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countPreventixProcessed); // Admin y Receptionist pueden contar procesados
router.get('/count/not-processed', hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countPreventixNotProcessed); // Admin y Receptionist pueden contar no procesados
router.get('/getall/today', hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getAllPreventixToday); // Admin y Receptionist pueden obtener todos de hoy

export default router;
