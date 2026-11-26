// ponytail: hardcoded sample data until the backend has course/event endpoints.

export interface Course {
  code: string;
  color: string;
}

export interface CalendarEvent {
  date: string; // YYYY-MM-DD, local time
  course: Course;
  title: string;
  source: "Canvas" | "Syllabus";
}

const A = { code: "CSCE 3420", color: "#1d2d3d" };
const B = { code: "CSCE 3600", color: "#416180" };
const M = { code: "MATH 3680", color: "#749dc4" };
const E = { code: "ENGL 2700", color: "#b5d9fd" };

export const courses: Course[] = [A, B, M, E];

const raw: [string, Course, string, CalendarEvent["source"]][] = [
  ["2026-10-02", M, "Quiz 3", "Canvas"],
  ["2026-10-05", B, "Lab 4", "Canvas"],
  ["2026-10-07", A, "Assignment 3", "Canvas"],
  ["2026-10-09", E, "Memo draft", "Syllabus"],
  ["2026-10-12", M, "HW 5", "Canvas"],
  ["2026-10-14", B, "Midterm", "Syllabus"],
  ["2026-10-16", E, "Usability memo", "Syllabus"],
  ["2026-10-18", A, "Project proposal", "Syllabus"],
  ["2026-10-19", M, "Quiz 5", "Canvas"],
  ["2026-10-20", B, "Lab 6", "Canvas"],
  ["2026-10-20", E, "Peer review", "Syllabus"],
  ["2026-10-21", A, "Midterm exam", "Syllabus"],
  ["2026-10-22", M, "HW 7", "Canvas"],
  ["2026-10-23", B, "Project 2 milestone", "Syllabus"],
  ["2026-10-23", A, "Reading quiz", "Canvas"],
  ["2026-10-26", E, "Report outline", "Syllabus"],
  ["2026-10-28", A, "Assignment 4", "Canvas"],
  ["2026-10-28", M, "Midterm", "Syllabus"],
  ["2026-10-30", B, "Lab 7", "Canvas"],
  ["2026-11-02", M, "HW 8", "Canvas"],
  ["2026-11-04", B, "Lab 8", "Canvas"],
  ["2026-11-06", E, "Report draft", "Syllabus"],
  ["2026-11-09", M, "Quiz 6", "Canvas"],
  ["2026-11-11", B, "Lab 9", "Canvas"],
  ["2026-11-12", E, "Peer review 2", "Syllabus"],
  ["2026-11-13", A, "Project checkpoint 2", "Syllabus"],
  ["2026-11-13", M, "HW 9", "Canvas"],
  ["2026-11-16", B, "Project 3 milestone", "Syllabus"],
  ["2026-11-18", A, "Assignment 5", "Canvas"],
  ["2026-11-20", M, "Quiz 7", "Canvas"],
  ["2026-11-25", A, "No class – Thanksgiving", "Syllabus"],
  ["2026-11-30", E, "Final paper", "Syllabus"],
];

export const events: CalendarEvent[] = raw.map(
  ([date, course, title, source]) => ({ date, course, title, source }),
);

export const policyReminder = {
  kicker: "Policy reminder",
  title: "CSCE 3420 project checkpoint is Friday",
  body: "Project deliverables have no late window. Syllabus p.4",
};
