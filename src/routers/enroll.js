import express from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/custom.middleware.js";
import { enrollValidator } from "../validators/enroll.validator.js";
import {
  myAllCourse,
  studentEnroll,
  instructorViewCourse,
} from "../controllers/enrollment.controller.js";
const router = express.Router();

router.post("/enrollment", auth, validate(enrollValidator), studentEnroll);
router.get("/viewsall", auth, myAllCourse);
router.get("/instructor/enrolledstudents", auth, instructorViewCourse);

export default router;
