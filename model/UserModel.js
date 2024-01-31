import mongoose from "mongoose";
import {
  JOB_BRANCH,
  JOB_DEPARTMENT,
  JOB_POSITION,
} from "../utils/constants.js";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "firstName",
  },
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  location: String,
  jobBranch: {
    type: String,
    enum: Object.values(JOB_BRANCH),
    default: JOB_BRANCH.AWAJI,
  },
  jobPosition: {
    type: String,
    enum: Object.values(JOB_POSITION),
    default: JOB_POSITION.DEVELOPER,
  },
  jobDepartment: {
    type: String,
    enum: Object.values(JOB_DEPARTMENT),
    default: JOB_DEPARTMENT.POWER_PLATFORM,
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
