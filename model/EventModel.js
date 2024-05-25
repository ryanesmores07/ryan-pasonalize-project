import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    event: String,
    description: String,
    dateTime: Date,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
