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

router.post("/post", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), postPreventix);
router.get("/getall", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getAllPreventix);
router.put("/update/:id", hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), updatePreventixStatus);
router.delete("/delete/:id", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), deletePreventix);
router.get('/count/processed', countPreventixProcessed);
router.get('/count/not-processed', countPreventixNotProcessed);
router.get('/getall/today', hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getAllPreventixToday);

export default router;
