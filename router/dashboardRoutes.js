import express from 'express';
import { getDashboardData } from '../controller/dashboardController.js';
import { hasRoles } from '../middlewares/auth.js';

const router = express.Router();

// Ruta para obtener los datos del dashboard
router.get('/data-for-dashboard', hasRoles('Admin','AdminLab', 'Receptionist', 'Doctor', 'Patient', 'Elisas', 'Westernblot', 'Direccion', 'Comercial', 'Cliente'), getDashboardData); // Admin, Doctor, Receptionist pueden acceder

export default router;
