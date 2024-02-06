import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
} from "../controller/userController.js";
import {
  validateIdParam,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllUsers);
router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUpdateUserInput, updateUser);

router.route("/:id").get(validateIdParam, getSingleUser);

export default router;
