import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controller/authController.js";
import { validationRegisterInput } from "../middleware/validationMiddleware.js";

router.post("/register", validationRegisterInput, register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
