import express from "express";
import {
  deletePreventix,
  getAllPreventix,
  postPreventix,
  updatePreventixStatus,
  countPreventixProcessed,
  countPreventixNotProcessed,
  getAllPreventixToday,
} from "../controller/preventixController.js";
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

router.post("/post", hasRoles(...allowedRoles), postPreventix);
router.get("/getall", hasRoles(...allowedRoles), getAllPreventix);
router.put("/update/:id", hasRoles(...allowedRoles), updatePreventixStatus);
router.delete("/delete/:id", hasRoles(...allowedRoles), deletePreventix);
router.get("/count/processed", hasRoles(...allowedRoles), countPreventixProcessed);
router.get("/count/not-processed", hasRoles(...allowedRoles), countPreventixNotProcessed);
router.get("/getall/today", hasRoles(...allowedRoles), getAllPreventixToday);

export default router;
