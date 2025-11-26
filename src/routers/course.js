import express from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/custom.middleware.js";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  viewCourse,
} from "../controllers/course.controller.js";
import {
  createCourseValidator,
  updateCourseValidator,
} from "../validators/course.validator.js";

const router = express.Router();

router.post("/create", auth, validate(createCourseValidator), createCourse);
router.put("/update/:id", auth, validate(updateCourseValidator), updateCourse);
router.delete("/delete/:id", auth, deleteCourse);
router.get("/view/:id", viewCourse);
router.get("/viewall", viewCourse);

export default router;
