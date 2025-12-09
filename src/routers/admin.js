import express from "express";
import { auth } from "../middleware/auth.js";
//import { validate } from "../middleware/custom.middleware.js";

//import { adminFeatures } from "../validators/users.validator.js";
import {
  deleteCourseAdmin,
  deleteUser,
  viewAllUsers,
  dashboardSummary,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/viewall", auth, viewAllUsers);
router.delete("/deleteuser/:id", auth, deleteUser);
router.delete("/delete/:id", auth, deleteCourseAdmin);
router.get("/count", auth, dashboardSummary);
/**
 * @swagger
 * /api/admin/viewall:
 *   get:
 *     tags:
 *       - Admin
 *     summary: View all users (Admin Only)
 *     description: Fetches all users with pagination and filtering options.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description:" Number of items per page (default: 10)""
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Only Admin can access this route
 */

/**
 * @swagger
 * /api/admin/deleteuser/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a user by ID
 *     description: Deletes a specific user using their unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid User ID
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Only Admin can delete users
 */

/**
 * @swagger
 * /api/admin/delete/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a course by ID
 *     description: Deletes a specific course using its unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID to delete
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       400:
 *         description: Invalid Course ID
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Only Admin can delete courses
 */
/**
 * @swagger
 * /api/admin/count:
 *   get:
 *     tags:
 *       - Admin Dashboard
 *     summary: Get dashboard summary
 *     description: Returns total users, total courses, and total enrollments. Only Admin can access.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                     totalCourses:
 *                       type: integer
 *                     totalEnrollments:
 *                       type: integer
 *       403:
 *         description: Access denied (Admin only)
 *       500:
 *         description: Server error
 */

export default router;
