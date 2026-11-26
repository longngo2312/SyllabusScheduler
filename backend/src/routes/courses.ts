// Benjamin Martinez

import { Router } from "express";
import { courses, type CourseRecord } from "../store/memoryStore.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/courses", (req: AuthRequest, res) => {
  const q = String(req.query.q ?? "").trim().toLowerCase();
  const term = String(req.query.term ?? "").trim().toLowerCase();

  const filtered = courses.filter((c) => {
    if (c.userId !== req.userId) return false;
    if (term && (c.term ?? "").toLowerCase() !== term) return false;
    if (q) {
      const matchCode = c.code.toLowerCase().includes(q);
      const matchTitle = c.title.toLowerCase().includes(q);
      if (!matchCode && !matchTitle) return false;
    }
    return true;
  });

  res.json({ courses: filtered });
});

router.post("/courses", (req: AuthRequest, res) => {
  const { code, title, term, deadlines } = req.body ?? {};
  if (!code || !title) {
    res.status(400).json({ message: "code and title are required" });
    return;
  }

  const course: CourseRecord = {
    id: String(courses.length + 1),
    userId: req.userId!,
    code: String(code).trim(),
    title: String(title).trim(),
    term: term ? String(term).trim() : undefined,
    deadlines: Array.isArray(deadlines) ? deadlines : [],
  };

  courses.push(course);
  res.status(201).json({ course });
});

router.put("/courses/:id", (req: AuthRequest, res) => {
  const course = courses.find((c) => c.id === req.params.id && c.userId === req.userId);
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  const { code, title, term, deadlines } = req.body ?? {};
  if (code !== undefined) course.code = String(code).trim();
  if (title !== undefined) course.title = String(title).trim();
  if (term !== undefined) course.term = term ? String(term).trim() : undefined;
  if (Array.isArray(deadlines)) course.deadlines = deadlines;

  res.json({ course });
});

router.delete("/courses/:id", (req: AuthRequest, res) => {
  const idx = courses.findIndex((c) => c.id === req.params.id && c.userId === req.userId);
  if (idx === -1) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  courses.splice(idx, 1);
  res.json({ deleted: true });
});

export default router;
