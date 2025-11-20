import express from "express";
import "dotenv/config";
import db from "./config/db.js"; // <-- IMPORT DB HERE
import userRoutes from "./routers/user.js";

const app = express();

// Middleware
app.use(express.json());
app.use("/api", userRoutes);

// Simple route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
