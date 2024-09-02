import express from "express";
import {
    addNewUser,
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getUserDetails,
    login,
    logoutAdmin,
    logoutPatient,
    logoutUser,
    patientRegister,
    countPatients,
    addNewReceptionist,
    addNewElisas,
    addNewWesternblot,
    addNewDireccion,
    addNewComercial,
    addNewCliente,
    getCurrentUserDetails // Añadir esta línea
} from "../controller/userController.js";
import { hasRoles, isAuthenticated } from "../middlewares/auth.js"; // Asegúrate de importar isAuthenticated

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/user/addnew", hasRoles('Admin'), addNewUser);
router.post("/admin/addnew", hasRoles('Admin'), addNewAdmin);
router.post("/doctor/addnew", hasRoles('Admin', 'Doctor'), addNewDoctor);
router.post("/receptionist/addnew", hasRoles('Admin'), addNewReceptionist);
router.post("/elisas/addnew", hasRoles('Admin'), addNewElisas);
router.post("/westernblot/addnew", hasRoles('Admin'), addNewWesternblot);
router.post("/direccion/addnew", hasRoles('Admin'), addNewDireccion);
router.post("/comercial/addnew", hasRoles('Admin'), addNewComercial);
router.post("/cliente/addnew", hasRoles('Admin'), addNewCliente);
router.get("/doctors", hasRoles('Admin', 'Doctor', 'recepcionista'), getAllDoctors);
router.get("/admin/me", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getUserDetails);
router.get("/admin/logout", hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), logoutAdmin);
router.get('/count/patients', hasRoles('Admin', 'AdminLab', 'recepcionista', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), countPatients);

// Añadir la ruta para obtener los detalles del usuario actual
router.get("/me", isAuthenticated, getCurrentUserDetails);
router.get("/logout", isAuthenticated, logoutUser);

export default router;
