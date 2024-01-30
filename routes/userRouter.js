import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controller/userController.js";
const router = Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getSingleUser)

router.route("/update-user/:id").patch(updateUser);

export default router;
