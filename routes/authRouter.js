import { Router } from "express";
const router = Router();
import { register } from "../controller/authController.js";
import { validationRegisterInput } from "../middleware/validationMiddleware.js";

router.post("/register", validationRegisterInput, register);

export default router;
