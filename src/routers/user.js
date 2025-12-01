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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
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
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User Login
 *     description: Logs in a user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Missing or invalid credentials
 *       401:
 *         description: Incorrect email or password
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get User Profile
 *     security:
 *       - bearerAuth: []
 *     description: Fetches logged-in user details using JWT.
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     tags:
 *       - User
 *     summary: Update User Profile
 *     security:
 *       - bearerAuth: []
 *     description: Updates user details like name, email, etc.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

export default router;
