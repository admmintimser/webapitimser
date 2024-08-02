// src/router/dashboardClientesRouter.js
import express from "express";
import { getDashboardData  } from "../controller/dashboardClientesController.js";

const router = express.Router();

router.get("/dashboardclientes", getDashboardData );

export default router;
