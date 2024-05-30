import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  joinEvent,
  getUsersJoined,
} from "../controller/eventController.js";
import { validateEventInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllEvents).post(validateEventInput, createEvent);

router.route("/:id").delete(deleteEvent).patch(updateEvent).get(getSingleEvent);

router.route("/:eventId/join").post(joinEvent);
router.route("/:eventId/usersJoined").get(getUsersJoined);

export default router;
