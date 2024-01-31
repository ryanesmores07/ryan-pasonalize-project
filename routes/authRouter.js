import { Router } from "express";
const router = Router();
import { register, login } from "../controller/authController.js";
import { validationRegisterInput } from "../middleware/validationMiddleware.js";

router.post("/register", validationRegisterInput, register);
router.post("/login", login);

export default router;
