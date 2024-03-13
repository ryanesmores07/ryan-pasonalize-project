import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controller/authController.js";
import {
  validationRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

router.post("/register", validationRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
