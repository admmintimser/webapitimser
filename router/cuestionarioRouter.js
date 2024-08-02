import express from "express";
import {
    createCuestionario,
    getAllCuestionarios,
    getCuestionarioById,
    updateCuestionario,
    deleteCuestionario,
    bulkUploadCuestionarios
} from "../controller/cuestionarioController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createCuestionario);
// Remover autenticación de administrador para getAllCuestionarios
router.get("/getall", getAllCuestionarios);
router.get("/:id", getCuestionarioById);
router.put("/update/:id", isAdminAuthenticated, updateCuestionario);
router.delete("/delete/:id", isAdminAuthenticated, deleteCuestionario);
router.post("/bulk-upload", isAdminAuthenticated, bulkUploadCuestionarios);

export default router;
