import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

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

export function isLoggedIn(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    // Redirect client-side to "/dashboard"
    console.log("there is a token");

    return res.redirect("/dashboard");
  } else {
    next(); // Continue to the next middleware if there is no token
  }
}
