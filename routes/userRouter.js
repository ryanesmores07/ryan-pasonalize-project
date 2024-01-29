import { Router } from "express";
import { getAllUsers, getSingleUser } from "../controller/userController.js";
const router = Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getSingleUser);

export default router;
