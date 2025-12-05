import express from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/custom.middleware.js";
import {
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import {
  addReviewValidator,
  updateCourseValidator,
} from "../validators/review.validator.js";

const router = express.Router();
router.post("/add", auth, validate(addReviewValidator), addReview);
router.get("/course/:courseId", getCourseReviews);
router.put(
  "/update/:reviewId",
  auth,
  validate(updateCourseValidator),
  updateReview
);
router.delete("/delete/:reviewId", auth, deleteReview);
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Course review operations
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
 * /reviews/add:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Add a review to a course
 *     security:
 *       - bearerAuth: []
 *     description: Allows a student to submit a review for a course they enrolled in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - rating
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "65a12f89bcd0012345678abc"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "Very useful course!"
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized – Student login required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /reviews/course/{courseId}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews for a course
 *     description: Fetches all reviews submitted for a particular course.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a12f89bcd0012345678abc"
 *     responses:
 *       200:
 *         description: Successfully fetched course reviews
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /reviews/update/{reviewId}:
 *   put:
 *     tags:
 *       - Reviews
 *     summary: Update an existing review
 *     security:
 *       - bearerAuth: []
 *     description: Allows a student to update their previously submitted review.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a12f89bcd0012345678def"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Updated comment: Great course!"
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       401:
 *         description: Unauthorized – Student login required
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /reviews/delete/{reviewId}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete a review
 *     security:
 *       - bearerAuth: []
 *     description: Allows a student to delete their submitted review.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a12f89bcd0012345678def"
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized – Only students can delete reviews
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

export default router;
