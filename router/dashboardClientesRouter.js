import express from "express";
import { getDashboardData } from "../controller/dashboardClientesController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboardclientes", isAuthenticated, getDashboardData); // Cualquier usuario autenticado puede acceder al dashboard

export default router;
