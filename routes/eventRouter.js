import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controller/eventController.js";
import { validateEventInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllEvents).post(validateEventInput, createEvent);

router.route("/:id").delete(deleteEvent).patch(validateEventInput, updateEvent);

export default router;
