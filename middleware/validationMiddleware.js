import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import User from "../model/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no user")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validationRegisterInput = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isLength({ max: 10 })
    .withMessage("first name must be at most 10 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("lastName")
    .notEmpty()
    .withMessage("last name is required")
    .isLength({ max: 10 })
    .withMessage("last name must be at most 10 characters long"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestError("invalid MongoDB id");
    const user = await User.findById(value);
    if (!user) throw new NotFoundError(`no user with id: ${value}`);
    // const isAdmin = req.user.role === "admin";
    // const isOwner = req.user.userId === user._id.toString();
    // if (!isAdmin && !isOwner)
    //   throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ max: 15 })
    .withMessage("first name must be at most 15 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("lastName")
    .notEmpty()
    .withMessage("last name is required")
    .isLength({ max: 15 })
    .withMessage("last name must be at most 15 characters long"),
  body("hobby")
    .isLength({ max: 20 })
    .withMessage("Hobby must be at most 20 characters long"),
  body("nickname")
    .isLength({ max: 15 })
    .withMessage("nickname must be at most 15 characters long"),
  body("celebrityCrush")
    .isLength({ max: 15 })
    .withMessage("name must be at most 15 characters long"),
  body("hometown")
    .isLength({ max: 30 })
    .withMessage("hometown must be at most 30 characters long"),
  body("aboutMe")
    .isLength({ max: 500 })
    .withMessage("about me must be at most 500 characters long"),
  body("yearEmployed").custom(async (value, { req }) => {
    if (value === undefined || value === null || value === "") {
      // If the value is undefined, null, or an empty string, it's considered valid
      return true;
    }

    const currentYear = new Date().getFullYear(); // Get the current year

    if (!/^\d+$/.test(value)) {
      // If the value is not a valid number, return false with an error message
      throw new BadRequestError("Year must be a number");
    }
    if (!/^\d{4}$/.test(value)) {
      throw new Error("有効な年を入力してください");
    }
    if (parseInt(value, 10) > currentYear) {
      throw new Error("有効な年を入力してください");
    }
    return true; // Return true to indicate the validation passed
  }),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
