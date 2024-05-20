import express from "express";
import {
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getAllFlebos,
    getUserDetails,
    login,
    logoutAdmin,
    logoutPatient,
    patientRegister,
    countPatients,
    addNewFlebo
} from "../controller/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/flebos", getAllFlebos);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get('/count/patients', countPatients);
router.post("/flebo/addnew", isAdminAuthenticated, addNewFlebo);

export default router;
