import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";
export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found");
    return next(ErrorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed");
      return next(ErrorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
