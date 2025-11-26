import express from "express";
import { validate } from "../middleware/custom.middleware.js";
import {
  createCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import {
  createCourseValidator,
  updateCourseValidator,
} from "../validators/course.validator.js";

import { auth } from "../middleware/auth.js";
const router = express.Router();
router.post("/create", auth, validate(createCourseValidator), createCourse);
router.put("/update:id", auth, validate(updateCourseValidator), updateCourse);

export default router;
