import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  adminLogin,
  getAllStudents,
  addStudent,
  updateStudentProgress,
  deleteStudent,
  getStudentById,
  getAnalytics
} from "./routes/admin";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin routes
  app.post("/api/admin/login", adminLogin);
  app.get("/api/admin/students", getAllStudents);
  app.post("/api/admin/students", addStudent);
  app.put("/api/admin/students/:studentId", updateStudentProgress);
  app.delete("/api/admin/students/:studentId", deleteStudent);
  app.get("/api/admin/students/:studentId", getStudentById);
  app.get("/api/admin/analytics", getAnalytics);

  return app;
}
