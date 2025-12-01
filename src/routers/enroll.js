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
/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Student enrollment & course access APIs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/enroll/enrollment:
 *   post:
 *     tags:
 *       - Enrollment
 *     summary: Enroll a student into a course
 *     security:
 *       - bearerAuth: []
 *     description: Allows a logged-in student to enroll in a course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "65a12f89bcd0012345678abc"
 *     responses:
 *       201:
 *         description: Student successfully enrolled
 *       400:
 *         description: Validation error or already enrolled
 *       401:
 *         description: Unauthorized – Student login required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/enroll/viewsall:
 *   get:
 *     tags:
 *       - Enrollment
 *     summary: Get all courses enrolled by the student
 *     security:
 *       - bearerAuth: []
 *     description: Returns the list of all courses the logged-in student has enrolled in.
 *     responses:
 *       200:
 *         description: Successfully fetched enrolled courses
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/enroll/instructor/enrolledstudents:
 *   get:
 *     tags:
 *       - Enrollment
 *     summary: View all students enrolled in instructor's courses
 *     security:
 *       - bearerAuth: []
 *     description: Allows an instructor to view the list of students enrolled in their courses.
 *     responses:
 *       200:
 *         description: Successfully fetched enrolled students
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Only instructors can access this
 *       500:
 *         description: Server error
 */

export default router;
