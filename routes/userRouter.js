import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controller/userController.js";
import { validateIdParam } from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(validateIdParam, getSingleUser)
  .patch(validateIdParam, updateUser);

export default router;
