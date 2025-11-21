import jwt from "jsonwebtoken";
import { Response } from "../utils/response.js";

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // check token exists
    if (!header || !header.startsWith("Bearer ")) {
      return Response(req, res, false, 401, null, "Token missing", null);
    }

    // remove Bearer
    const token = header.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // save user data in req for next routes
    req.user = decoded;

    next();
  } catch (error) {
    return Response(
      req,
      res,
      false,
      401,
      null,
      "Invalid or expired token",
      error
    );
  }
};
