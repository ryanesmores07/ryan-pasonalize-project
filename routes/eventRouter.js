import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  joinEvent,
  unjoinEvent,
} from "../controller/eventController.js";
import { validateEventInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllEvents).post(validateEventInput, createEvent);

router
  .route("/:id")
  .delete(deleteEvent)
  .patch(validateEventInput, updateEvent)
  .get(getSingleEvent);

router.route("/:eventId/join").post(joinEvent);
router.route("/:eventId/unjoin").post(unjoinEvent);

export default router;
