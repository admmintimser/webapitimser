import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAuthenticated, hasRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", isAuthenticated, sendMessage); // Cualquier usuario autenticado puede enviar mensajes
router.get("/getall", hasRoles('Admin', 'AdminLab', 'Receptionist', 'Doctor'), getAllMessages); // Admin, Receptionist, Doctor pueden obtener todos los mensajes

export default router;
