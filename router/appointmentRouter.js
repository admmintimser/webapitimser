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
  getAllAppointmentsToday,
  getAppointmentsDashboard,
} from "../controller/appointmentController.js";
import { hasRoles } from "../middlewares/auth.js";

const router = express.Router();

const allowedRoles = [
  "Admin",
  "AdminLab",
  "Receptionist",
  "Doctor",
  "Patient",
  "Elisas",
  "Westernblot",
  "Direccion",
  "Comercial",
  "Cliente",
];

router.post("/post", postAppointment);

router.get("/getall", hasRoles(...allowedRoles), getAllAppointments);

router.put("/update/:id", hasRoles(...allowedRoles), updateAppointmentStatus);

router.delete("/delete/:id", hasRoles(...allowedRoles), deleteAppointment);

router.get("/count/processed", hasRoles(...allowedRoles), countAppointmentsProcessed);

router.get("/count/not-processed", hasRoles(...allowedRoles), countAppointmentsNotProcessed);

router.get("/count/today", hasRoles(...allowedRoles), countAppointmentsToday);

router.get("/count/today-processed", hasRoles(...allowedRoles), countProcessedAppointmentsToday);

router.get("/getall/today", hasRoles(...allowedRoles), getAllAppointmentsToday);

router.get("/dashboard", hasRoles(...allowedRoles), getAppointmentsDashboard);

router.get("/appointment/:id", getAppointmentById);

export default router;
