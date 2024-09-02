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
import { hasRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", hasRoles('Admin', 'AdminLab', 'Comercial'), createCliente); // Solo Admin puede crear clientes
router.get("/getall", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Elisas', 'Comercial'), getAllClientes); // Admin, Receptionist y Comercial pueden obtener todos los clientes
router.get("/:id", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Comercial'), getClienteById); // Admin, Receptionist y Comercial pueden obtener detalles del cliente
router.put("/update/:id", hasRoles('Admin', 'AdminLab', 'Comercial'), updateCliente); // Admin y Comercial pueden actualizar
router.delete("/delete/:id", hasRoles('Admin'), deleteCliente); // Solo Admin puede borrar
router.get("/:id/countPreventix", hasRoles('Admin', 'AdminLab', 'recepcionista'), countPreventixByCliente); // Admin y Receptionist pueden contar Preventix por cliente
router.get("/:id/countPreventixByEstatus", hasRoles('Admin', 'AdminLab', 'recepcionista'), countPreventixByEstatus); // Admin y Receptionist pueden contar Preventix por estatus

export default router;
