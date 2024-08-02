// src/router/clienteRouter.js
import express from "express";
import {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente,
    countPreventixByCliente,
    countPreventixByEstatus
} from "../controller/clienteController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createCliente);
router.get("/getall", isAdminAuthenticated, getAllClientes);
router.get("/:id", isAdminAuthenticated, getClienteById);
router.put("/update/:id", isAdminAuthenticated, updateCliente);
router.delete("/delete/:id", isAdminAuthenticated, deleteCliente);
router.get("/:id/countPreventix", isAdminAuthenticated, countPreventixByCliente);
router.get("/:id/countPreventixByEstatus", isAdminAuthenticated, countPreventixByEstatus);

export default router;
