import express from 'express';
import {getDashboardData} from '../controller/dashboardController.js';
import {isAdminAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

// Ruta para obtener los datos del dashboard
router.get('/data-for-dashboard', isAdminAuthenticated, getDashboardData);

export default router;
