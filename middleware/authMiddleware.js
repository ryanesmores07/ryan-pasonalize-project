import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const isLoggedIn = async (req, res, next) => {
  // 1) Verify Token
  if (req.cookies.token) {
    try {
      const decoded = await jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.userId);

      if (!currentUser) {
        return next();
      }

      // There is a logged in user
      res.locals.user = currentUser;
    } catch (error) {
      return next();
    }
  }
  next();
};
