// Benjamin Martinez

import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, type UserRecord } from "../store/memoryStore.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

function toPublicUser(user: UserRecord) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

function signToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body ?? {};
  if (!username || !email || !password) {
    res.status(400).json({ message: "username, email, and password are required" });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const exists = users.some((u) => u.email === normalizedEmail);
  if (exists) {
    res.status(409).json({ message: "Email is already registered" });
    return;
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const user: UserRecord = {
    id: String(users.length + 1),
    username: String(username).trim(),
    email: normalizedEmail,
    passwordHash,
  };
  users.push(user);

  const token = signToken(user.id);
  res.status(201).json({ token, user: toPublicUser(user) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail);
  if (!user?.passwordHash) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const valid = await bcrypt.compare(String(password), user.passwordHash);
  if (!valid) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = signToken(user.id);
  res.json({ token, user: toPublicUser(user) });
});

// Returns authenticated user profile for session checks
router.get("/me", requireAuth, (req: AuthRequest, res) => {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ user: toPublicUser(user) });
});

export default router;
