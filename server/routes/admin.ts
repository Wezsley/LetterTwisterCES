import { RequestHandler } from "express";

interface Student {
  id: string;
  name: string;
  email: string;
  totalScore: number;
  gamesPlayed: number;
  averageScore: number;
  lastPlayed: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

interface AdminUser {
  id: string;
  username: string;
  password: string; // In production, this should be hashed
  role: 'teacher' | 'admin';
}

// Mock database - In production, use a real database
let students: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    totalScore: 250,
    gamesPlayed: 15,
    averageScore: 17,
    lastPlayed: "2025-01-15",
    achievements: ["First Steps", "Word Warrior"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    totalScore: 180,
    gamesPlayed: 12,
    averageScore: 15,
    lastPlayed: "2025-01-14",
    achievements: ["First Steps"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const adminUsers: AdminUser[] = [
  {
    id: "admin1",
    username: "teacher",
    password: "teacher123", // In production, hash this
    role: "teacher"
  }
];

// Admin authentication middleware
const authenticateAdmin: RequestHandler = (req, res, next) => {
  const { username, password } = req.body;
  
  const admin = adminUsers.find(u => u.username === username && u.password === password);
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  // In production, use JWT tokens
  (req as any).admin = admin;
  next();
};

// Admin login
export const adminLogin: RequestHandler = (req, res) => {
  const { username, password } = req.body;
  
  const admin = adminUsers.find(u => u.username === username && u.password === password);
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  // In production, return JWT token
  res.json({
    success: true,
    admin: {
      id: admin.id,
      username: admin.username,
      role: admin.role
    },
    token: "mock-jwt-token" // In production, generate real JWT
  });
};

// Get all students
export const getAllStudents: RequestHandler = (req, res) => {
  res.json({
    success: true,
    students,
    count: students.length
  });
};

// Add new student
export const addStudent: RequestHandler = (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  
  // Check if student already exists
  const existingStudent = students.find(s => s.email === email);
  if (existingStudent) {
    return res.status(409).json({ error: "Student with this email already exists" });
  }
  
  const newStudent: Student = {
    id: Date.now().toString(),
    name,
    email,
    totalScore: 0,
    gamesPlayed: 0,
    averageScore: 0,
    lastPlayed: "Never",
    achievements: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  students.push(newStudent);
  
  res.status(201).json({
    success: true,
    student: newStudent
  });
};

// Update student progress
export const updateStudentProgress: RequestHandler = (req, res) => {
  const { studentId } = req.params;
  const { totalScore, gamesPlayed, achievements } = req.body;
  
  const studentIndex = students.findIndex(s => s.id === studentId);
  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  
  const student = students[studentIndex];
  
  // Update student data
  if (totalScore !== undefined) student.totalScore = totalScore;
  if (gamesPlayed !== undefined) student.gamesPlayed = gamesPlayed;
  if (achievements !== undefined) student.achievements = achievements;
  
  student.averageScore = student.gamesPlayed > 0 ? Math.round(student.totalScore / student.gamesPlayed) : 0;
  student.lastPlayed = new Date().toISOString().split('T')[0];
  student.updatedAt = new Date().toISOString();
  
  students[studentIndex] = student;
  
  res.json({
    success: true,
    student
  });
};

// Delete student
export const deleteStudent: RequestHandler = (req, res) => {
  const { studentId } = req.params;
  
  const studentIndex = students.findIndex(s => s.id === studentId);
  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  
  const deletedStudent = students.splice(studentIndex, 1)[0];
  
  res.json({
    success: true,
    message: "Student deleted successfully",
    student: deletedStudent
  });
};

// Get student by ID
export const getStudentById: RequestHandler = (req, res) => {
  const { studentId } = req.params;
  
  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  
  res.json({
    success: true,
    student
  });
};

// Get analytics data
export const getAnalytics: RequestHandler = (req, res) => {
  const totalStudents = students.length;
  const totalGames = students.reduce((acc, s) => acc + s.gamesPlayed, 0);
  const totalScore = students.reduce((acc, s) => acc + s.totalScore, 0);
  const totalAchievements = students.reduce((acc, s) => acc + s.achievements.length, 0);
  const averageScore = totalStudents > 0 ? Math.round(totalScore / totalStudents) : 0;
  
  // Top performers
  const topPerformers = students
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 5);
  
  // Recent activity
  const recentActivity = students
    .filter(s => s.lastPlayed !== "Never")
    .sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())
    .slice(0, 10);
  
  res.json({
    success: true,
    analytics: {
      overview: {
        totalStudents,
        totalGames,
        totalScore,
        totalAchievements,
        averageScore
      },
      topPerformers,
      recentActivity
    }
  });
};

export { authenticateAdmin };
