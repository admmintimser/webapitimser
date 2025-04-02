import express from "express";
import {
    getAllCuestionarios,
    getCuestionarioById,
    createCuestionario,
    updateCuestionario,
    deleteCuestionario,
} from "../controllers/cuestionarioController.js";

const router = express.Router();

// Obtener todos los cuestionarios
router.get("/getall", getAllCuestionarios);

// Obtener cuestionario por ID
router.get("/:id", getCuestionarioById);

// Crear un nuevo cuestionario
router.post("/create", createCuestionario);

// Actualizar un cuestionario existente
router.put("/update/:id", updateCuestionario);

// Eliminar un cuestionario
router.delete("/delete/:id", deleteCuestionario);

export default router;
