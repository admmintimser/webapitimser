import express from "express";
import {
    deletePreventix,
    getAllPreventix,
    postPreventix,
    updatePreventixStatus,
    countPreventixProcessed,
    countPreventixNotProcessed,
    getAllPreventixToday
} from "../controller/preventixController.js";
import { isAdminAuthenticated, isReceptionistOrAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isReceptionistOrAdminAuthenticated, postPreventix);
router.get("/getall", isAdminAuthenticated, getAllPreventix);
router.put("/update/:id", isAdminAuthenticated, updatePreventixStatus);
router.delete("/delete/:id", isAdminAuthenticated, deletePreventix);
router.get('/count/processed', countPreventixProcessed);
router.get('/count/not-processed', countPreventixNotProcessed);
router.get('/getall/today', isAdminAuthenticated, getAllPreventixToday);

export default router;
