import mongoose from "mongoose";
import {
  JOB_BRANCH,
  JOB_DEPARTMENT,
  JOB_POSITION,
  ZODIAC_SIGN,
  BLOOD_TYPE,
  LOVE_LANGUAGE,
} from "../utils/constants.js";

const UserSchema = new mongoose.Schema(
  {
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
    jobBranch: {
      type: String,
      enum: Object.values(JOB_BRANCH),
      default: JOB_BRANCH.DEFAULT,
    },
    jobPosition: {
      type: String,
      enum: Object.values(JOB_POSITION),
      default: JOB_POSITION.DEFAULT,
    },
    jobDepartment: {
      type: String,
      enum: Object.values(JOB_DEPARTMENT),
      default: JOB_DEPARTMENT.DEFAULT,
    },
    zodiacSign: {
      type: String,
      enum: Object.values(ZODIAC_SIGN),
      default: ZODIAC_SIGN.DEFAULT,
    },
    bloodType: {
      type: String,
      enum: Object.values(BLOOD_TYPE),
      default: BLOOD_TYPE.DEFAULT,
    },
    loveLanguage: {
      type: String,
      enum: Object.values(LOVE_LANGUAGE),
      default: LOVE_LANGUAGE.DEFAULT,
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
