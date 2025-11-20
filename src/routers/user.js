import express from "express";
import { validate } from "../middleware/custom.middleware.js";
import { registerSchema } from "../validators/users.validator.js";

import { getUserById, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user/:id", getUserById);

router.post("/user/register", validate(registerSchema), createUser);

export default router;
