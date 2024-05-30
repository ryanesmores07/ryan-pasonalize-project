import mongoose from "mongoose";
import { EVENT_STATUS } from "../utils/constants.js";

const EventSchema = new mongoose.Schema(
  {
    event: String,
    description: String,
    dateTime: Date,
    eventStatus: {
      type: String,
      enum: Object.values(EVENT_STATUS),
      default: EVENT_STATUS.FUTURE_EVENTS,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    usersJoined: [{
      type: mongoose.Types.ObjectId,
      ref: "User"
    }] // Array of user IDs
  },
  { timestamps: true }
);

// Middleware to update eventStatus based on dateTime
EventSchema.pre("find", async function (next) {
  await updateEventStatus();
  next();
});

EventSchema.pre("findOne", async function (next) {
  await updateEventStatus();
  next();
});

async function updateEventStatus() {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  // Update events with dateTime before today
  await mongoose.model("Event").updateMany(
    {
      dateTime: { $lt: startOfDay },
      eventStatus: { $ne: EVENT_STATUS.PAST_EVENTS },
    },
    { $set: { eventStatus: EVENT_STATUS.PAST_EVENTS } }
  );

  // Update events with dateTime within today
  await mongoose.model("Event").updateMany(
    {
      dateTime: { $gte: startOfDay, $lte: endOfDay },
      eventStatus: { $ne: EVENT_STATUS.FUTURE_EVENTS },
    },
    { $set: { eventStatus: EVENT_STATUS.FUTURE_EVENTS } }
  );

  // Update events with dateTime after today
  await mongoose.model("Event").updateMany(
    {
      dateTime: { $gt: endOfDay },
      eventStatus: { $ne: EVENT_STATUS.FUTURE_EVENTS },
    },
    { $set: { eventStatus: EVENT_STATUS.FUTURE_EVENTS } }
  );
}

export default mongoose.model("Event", EventSchema);
