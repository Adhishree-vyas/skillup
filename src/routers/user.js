import express from "express";
import { validate } from "../middleware/custom.middleware.js";
import { registerSchema } from "../validators/users.validator.js";
import { auth } from "../middleware/auth.js";
import {
  getUserById,
  createUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user/:id", auth, getUserById);
router.post("/login", loginUser);
router.get("/profile", auth, (req, res) => {
  return Response(req, res, true, 200, req.user, "Profile fetched", null);
}); // Protected route

router.post("/user/register", validate(registerSchema), createUser);

export default router;
