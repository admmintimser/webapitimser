import express from "express";
import {
    createCuestionario,
    getAllCuestionarios,
    getCuestionarioById,
    updateCuestionario,
    deleteCuestionario,
    bulkUploadCuestionarios
} from "../controller/cuestionarioController.js";
import { hasRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", hasRoles('Admin'), createCuestionario); // Solo Admin puede crear cuestionarios
router.get("/getall", getAllCuestionarios); // Acceso sin seguridad
router.get("/:id", getCuestionarioById); // Acceso sin seguridad
router.put("/update/:id", hasRoles('Admin'), updateCuestionario); // Solo Admin puede actualizar
router.delete("/delete/:id", hasRoles('Admin'), deleteCuestionario); // Solo Admin puede borrar
router.post("/bulk-upload", hasRoles('Admin'), bulkUploadCuestionarios); // Solo Admin puede hacer bulk upload

export default router;
