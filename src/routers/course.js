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
router.put("/update", auth, validate(updateCourseValidator), updateCourse);
router.delete("/delete/:id", auth, deleteCourse);
router.get("/view/:id", viewCourse);
router.get("/viewall", viewCourse);
/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course management APIs
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
 * /api/course/create:
 *   post:
 *     tags:
 *       - Course
 *     summary: Create a new course
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new course. Authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: "JavaScript Basics"
 *               description:
 *                 type: string
 *                 example: "This course teaches JavaScript fundamentals."
 *               price:
 *                 type: number
 *                 example: 499
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/course/update:
 *   put:
 *     tags:
 *       - Course
 *     summary: Update an existing course
 *     security:
 *       - bearerAuth: []
 *     description: Updates a course by providing updated fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "65a12345f89bcd0012345678"
 *               title:
 *                 type: string
 *                 example: "Updated Course Title"
 *               description:
 *                 type: string
 *                 example: "Updated course description."
 *               price:
 *                 type: number
 *                 example: 599
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/course/delete/{id}:
 *   delete:
 *     tags:
 *       - Course
 *     summary: Delete a course by ID
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a course from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a12345f89bcd0012345678"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/course/view/{id}:
 *   get:
 *     tags:
 *       - Course
 *     summary: View course by ID
 *     description: Returns course details using course ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a12345f89bcd0012345678"
 *     responses:
 *       200:
 *         description: Course fetched successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/course/viewall:
 *   get:
 *     tags:
 *       - Course
 *     summary: View all courses
 *     description: Returns a list of all available courses.
 *     responses:
 *       200:
 *         description: Successfully fetched all courses
 *       500:
 *         description: Server error
 */

export default router;
