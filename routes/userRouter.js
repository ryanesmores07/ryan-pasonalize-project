import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
} from "../controller/userController.js";
import { validateIdParam } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllUsers);
router.get("/current-user", getCurrentUser);

router.route("/:id").get(getSingleUser).patch(validateIdParam, updateUser);

export default router;
