import express from "express";
import "dotenv/config";
import db from "./config/db.js"; // <-- IMPORT DB HERE
import userRoutes from "./routers/user.js";
import courseRoutes from "./routers/course.js";
import enrollRoutes from "./routers/enroll.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

// Middleware
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
