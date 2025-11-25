import express from "express";
import { validate } from "../middleware/custom.middleware.js";
import {
  registerSchema,
  updateProfileSchema,
} from "../validators/users.validator.js";
import { auth } from "../middleware/auth.js";
import {
  getUserById,
  createUser,
  loginUser,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", auth, getUserById);
router.post("/login", loginUser);
router.post("/register", validate(registerSchema), createUser);
router.put("/profile", auth, validate(updateProfileSchema), updateUserProfile);

export default router;
