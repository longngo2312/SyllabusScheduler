# Syllabus Scheduler: MVP → full app plan

## Context

The frontend (on `main`) is a polished UI shell. Auth forms don't submit, and the dashboard runs on `sampleData.ts`. The backend (`origin/feat/backend-core`) has JWT auth and course CRUD over in-memory arrays, with no database.
Over 4 rounds of Q&A we settled the architecture (decisions table below).
This plan splits the work into an **MVP** first, then the **full app**, and assigns each piece to one of three owners:

- **Jack: Frontend** (`frontend-vite/`)
- **Benjamin: Backend** (`backend/src/routes`, `backend/src/services`)
- **Luis: Database** (`backend/src/db`: schema, connection, query functions)

The app runs locally for the demo.

**MVP goal:** a student signs up, uploads a syllabus PDF, reviews what Claude extracted, confirms it, and sees the deadlines on the dashboard calendar and the busy-weeks view.

## Decisions (from Q&A)

| #   | Topic             | Decision                                                                                                                                 |
| --- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | DB                | SQLite via built-in `node:sqlite` (Node 22.15), plain SQL                                                                                |
| 2   | Extraction        | Claude `claude-haiku-5-5` via `@anthropic-ai/sdk`; PDF sent as a `document` block; JSON schema output                                    |
| 3   | Syllabus flow     | Draft → review screen → confirm; only confirmed items saved                                                                              |
| 4   | Auth              | Username + password (MVP); forgot password via OTP and Google sign-in (full)                                                             |
| 5   | OTP email         | Resend API via `fetch`                                                                                                                   |
| 6   | Canvas            | Personal access token (encrypted AES-GCM); "Sync now" + auto if > 1h stale; match by course code or auto-create; upsert by assignment id |
| 7   | PDFs              | Kept at `backend/uploads/<id>.pdf`, served behind auth                                                                                   |
| 8   | Busy weeks        | Weighted load: Σ deadline grade weight per week                                                                                          |
| 9   | Frontend fetching | `api()` fetch wrapper + zustand; no new dependency                                                                                       |
| 10  | Colors            | Auto-assigned from the steel palette, editable on the Courses page (full)                                                                |
| 11  | Deploy            | Local/demo only                                                                                                                          |
| 12  | Repo flow         | Commit frontend WIP → merge `feat/backend-core` → one branch per feature, PRs into main                                                  |

## How the three owners stay unblocked

1. **Day 0: agree on the API contract** (the endpoint tables below), with request and response shapes in `backend/src/types.ts`. Jack copies the shapes into `frontend-vite/src/@types/`.
2. **Luis exposes query functions, not SQL**, through `src/db/*.ts` (e.g. `users.findByUsername()`, `deadlines.upsertMany()`). Benjamin's routes call only those, so either side can change without breaking the other. Until Luis's module lands, Benjamin keeps `memoryStore.ts` behind the same function names.
3. **Jack builds against fixtures:** `api.ts` falls back to `sampleData`-style fixtures until each endpoint is live, then switches over.

---

# Phase 1: MVP

## MVP features

1. Sign up, log in (username + password), log out, stay logged in across refresh, `/dashboard` protected
2. Courses: list, create, edit, delete; deadlines: add, edit, mark complete, delete
3. Syllabus upload → Claude extraction → editable review → confirm (creates or updates the course, grading weights, deadlines)
4. Dashboard calendar, "this week" and "upcoming" on real data
5. Busy weeks page (weighted load)

**Deferred to Phase 2:** Canvas, forgot password, Google sign-in, policy reminders, PDF preview on the review screen, color picker, past-uploads list.

## MVP database (Luis)

`backend/src/db/schema.sql`, run at startup with `CREATE TABLE IF NOT EXISTS`. `PRAGMA foreign_keys=ON`. IDs come from `crypto.randomUUID()`.

- `users(id PK, username UNIQUE NOT NULL, email UNIQUE NOT NULL, password_hash, created_at)`
- `courses(id PK, user_id FK→users CASCADE, code, title, term, color, UNIQUE(user_id, code))`
- `grading_weights(id PK, course_id FK CASCADE, category, weight REAL)`
- `deadlines(id PK, course_id FK CASCADE, title, category, due_date 'YYYY-MM-DD', due_time NULL, weight REAL NULL, source 'Syllabus'|'Manual', completed INT DEFAULT 0)`
- `syllabi(id PK, user_id FK CASCADE, course_id NULL, filename, status 'draft'|'confirmed'|'failed', draft_json TEXT, error TEXT NULL, created_at)`

Deliverables:

- `src/db/index.ts`: opens `DatabaseSync`, runs the schema.
- Query modules: `users.ts`, `courses.ts`, `deadlines.ts`, `syllabi.ts`.
- `confirmSyllabus(userId, draft)`: one transaction that upserts the course by code, replaces its grading weights, and inserts deadlines.
- `eventsInRange(userId, from, to)`: a join returning deadlines with the course code and color.
- `seed.ts`: a demo user plus the current `sampleData` courses and events, so Jack has realistic data.

## MVP API (Benjamin)

All routes are under `/api` and require a Bearer JWT unless marked public. Errors are `{message}` with the right status.

| Method | Path                     | Body / query                                    | Returns                                                                             |
| ------ | ------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| POST   | `/signup` (public)       | `{username, email, password}`                   | `201 {token, user}`; 409 if username or email is taken                              |
| POST   | `/login` (public)        | **`{username, password}`**                      | `{token, user}`                                                                     |
| GET    | `/me`                    | —                                               | `{user}`                                                                            |
| GET    | `/courses`               | `?q&term`                                       | `{courses: Course[]}` (with deadlines)                                              |
| POST   | `/courses`               | `{code, title, term?}`                          | `201 {course}`, color auto-assigned                                                 |
| GET    | `/courses/:id`           | —                                               | `{course}`                                                                          |
| PUT    | `/courses/:id`           | `{code?, title?, term?}`                        | `{course}`                                                                          |
| DELETE | `/courses/:id`           | —                                               | `{deleted:true}`                                                                    |
| POST   | `/courses/:id/deadlines` | `{title, category, dueDate, dueTime?, weight?}` | `201 {deadline}`                                                                    |
| PATCH  | `/deadlines/:id`         | any deadline field incl. `completed`            | `{deadline}`                                                                        |
| DELETE | `/deadlines/:id`         | —                                               | `{deleted:true}`                                                                    |
| GET    | `/events`                | `?from=YYYY-MM-DD&to=`                          | `{events: {id,date,time,title,category,source,completed,course:{id,code,color}}[]}` |
| POST   | `/syllabi`               | multipart `file` (PDF, ≤ 20 MB)                 | `201 {syllabus}` with `status` and `draft`                                          |
| GET    | `/syllabi/:id`           | —                                               | `{syllabus}`                                                                        |
| PUT    | `/syllabi/:id/draft`     | `{draft}`                                       | `{syllabus}`                                                                        |
| POST   | `/syllabi/:id/confirm`   | —                                               | `{course}`                                                                          |

`user` = `{id, username, email}`.
`draft` = `{course:{code,title,term}, gradingWeights:[{category,weight}], deadlines:[{title,category,dueDate,dueTime?,weight?,page?}], policies:[{kind,text,page?}]}`. Policies are stored in the draft now and shown in Phase 2.

Backend work items:

- Port `routes/auth.ts` and `routes/courses.ts` from `memoryStore` to Luis's query functions. Switch login to `username`.
- Add `multer` (PDF upload) and `@anthropic-ai/sdk`.
- `src/services/extract.ts`:
  - Read the file, call `messages.create` with `model:"claude-haiku-5-5"`, a `document` block and `output_config.format` json_schema of the draft shape.
  - Check `stop_reason` before parsing; on `refusal`/`max_tokens` set `status=failed` and store `error`.
  - Confirm the exact SDK syntax against the claude-api skill docs.
- `backend/.env` (gitignored) + `.env.example`: `JWT_SECRET`, `ANTHROPIC_API_KEY`. Change the dev script to `tsx watch --env-file=.env src/index.ts`. Exit at startup if `JWT_SECRET` is missing.
- Remove `app.use(cors())`; the Vite proxy makes it unnecessary.

## MVP frontend (Jack)

| Area                   | Work                                                                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `services/api.ts`      | `api<T>(path, init)`: adds the Bearer token, sends JSON (skips it for FormData), throws `{status,message}` on `!ok`, logs out on 401. One function per endpoint above.                                                             |
| `@types/`              | `User {id:string, username, email}` (drop `password`), `Course`, `Deadline`, `CalendarEvent`, `SyllabusDraft`                                                                                                                      |
| `store/authStore.ts`   | A real zustand store with `persist`: token, user, `setAuth`, `logout`                                                                                                                                                              |
| `store/dataStore.ts`   | courses, events, `loadCourses()`, `loadEvents(from,to)`, `refresh()` after mutations                                                                                                                                               |
| `hooks/auth/*`         | `useLogin`, `useSignup`, `useLogout` (pending + error state)                                                                                                                                                                       |
| `routes/index.tsx`     | A `/dashboard` loader that redirects to `/login` without a token                                                                                                                                                                   |
| Login / Register forms | Wire to the hooks, show the error message, navigate to `/dashboard`                                                                                                                                                                |
| `layouts.tsx`          | Sidebar courses from the store, real username, working logout. Hide the Canvas status line until Phase 2                                                                                                                           |
| `Dashboard.tsx`        | Replace the `sampleData` imports with `dataStore` (same rendering). Hide the policy card until Phase 2. The "+ Upload syllabus" button links to the upload page                                                                    |
| `UploadedSyllabus.tsx` | PDF picker/drop zone → spinner while extracting → review form (course fields, weights table, deadline rows editable and deletable, add row) → Save draft / Confirm → navigate to Dashboard. Show `error` if status is `failed`     |
| `Courses.tsx`          | Course list → detail with editable fields and a deadline table (toggle completed, add, edit, delete). Delete course with a confirm step                                                                                            |
| `BusyWeek.tsx`         | Group events by week (Sunday start, same `iso()`/`addDays` helpers as Dashboard). Score = Σ weight, falling back to category defaults (exam 20, project 15, quiz 5, assignment 5, reading 1). Bars per week, top weeks highlighted |
| Cleanup                | Delete the empty `features/auth/*` files, and delete `sampleData.ts` once nothing imports it                                                                                                                                       |

## MVP order of work (parallel)

| Step | Jack (FE)                                                          | Benjamin (BE)                                      | Luis (DB)                                          |
| ---- | ------------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| 0    | Commit WIP; together: merge the backend branch, agree the contract | same                                               | same                                               |
| 1    | api helper, auth store, hooks, guard, forms                        | Auth routes to username, env, contract types       | Schema + `db/index.ts` + users and courses queries |
| 2    | Courses page, Dashboard/sidebar on real data                       | Courses, deadlines and events routes               | deadlines queries, `eventsInRange`, seed           |
| 3    | Upload + review page                                               | Upload + extraction service + draft/confirm routes | syllabi queries, `confirmSyllabus` transaction     |
| 4    | Busy weeks page                                                    | Bug fixes, selftest                                | Selftest for queries                               |

**MVP done when** the end-to-end MVP check below passes on a fresh clone.

---

# Phase 2: full application

| Feature                   | DB (Luis)                                                                                                                                                                                         | API (Benjamin)                                                                                                                                                                                                                             | Frontend (Jack)                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Policy reminders**      | `policies(id, course_id, kind, text, page)`; confirm inserts them                                                                                                                                 | `GET /reminders` (policies for courses with deadlines in the next 7 days)                                                                                                                                                                  | Dashboard policy card from data, citing "Syllabus p.N"                                                                |
| **PDF preview + history** | —                                                                                                                                                                                                 | `GET /syllabi` (list), `GET /syllabi/:id/file` (streams the PDF, auth-checked)                                                                                                                                                             | `<iframe>` preview beside the review form; past-uploads list                                                          |
| **Course colors**         | (`color` already exists)                                                                                                                                                                          | `PUT /courses/:id` accepts `color`                                                                                                                                                                                                         | `<input type="color">` on Courses                                                                                     |
| **Canvas sync**           | `users` + `canvas_token_enc, canvas_base_url, canvas_synced_at`; `courses.canvas_course_id`; `deadlines.canvas_assignment_id` + `UNIQUE(course_id, canvas_assignment_id)`; source adds `'Canvas'` | `PUT /canvas/token` (validates via `/api/v1/users/self`, encrypts with `CANVAS_ENC_KEY`), `DELETE /canvas/token`, `POST /canvas/sync` (active courses → assignments, `Link` pagination, match/create course, upsert), `GET /canvas/status` | Connect form on Courses; sidebar "Canvas synced X ago" + Sync now; auto-sync on Dashboard load if > 1h; source badges |
| **Forgot password**       | `password_resets(user_id PK, otp_hash, expires_at, attempts)`                                                                                                                                     | `POST /forgot-password` (always 200, Resend email), `POST /verify-otp` (max 5 attempts → reset token, 15 min), `POST /reset-password`                                                                                                      | Wire the existing 3-step `ForgetPasswordForm`                                                                         |
| **Google sign-in**        | `users.google_id UNIQUE NULL`; `password_hash` nullable                                                                                                                                           | `GET /auth/google` → Google; `GET /auth/google/callback` exchanges the code with `fetch`, links by `google_id` or email or creates the user (unique username from the email), redirects to `/auth/callback#token=`                         | Google buttons link to `/api/auth/google`; new `/auth/callback` route stores the token                                |

New env vars for Phase 2: `RESEND_API_KEY`, `RESEND_FROM`, `CANVAS_ENC_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `APP_URL=http://localhost:5173`.
Suggested order: reminders + PDF preview + colors (small, build on the MVP) → Canvas → forgot password → Google.

---

## Verification

**Backend selftest** (`npm run selftest` → `src/selftest.ts`, plain asserts on a temp `.db`):

- signup → login → course CRUD
- deadline toggle
- `confirmSyllabus` upserts by code without duplicating
- Phase 2: Canvas upsert run twice gives no duplicates

**Static checks:** `npm run build` in both packages; `npm run lint` in the frontend.

**MVP end-to-end** (both `npm run dev`):

1. Sign up, refresh (still logged in), log out, log in by username.
2. `/dashboard` while logged out redirects to `/login`.
3. Upload a real syllabus → edit one date in the draft → Confirm → the course appears in the sidebar and its deadlines on the calendar.
4. Mark a deadline complete on Courses → the Dashboard reflects it.
5. Busy weeks ranks the midterm week highest.

**Phase 2 end-to-end:**

1. Paste a Canvas PAT → Sync now → Canvas items appear; syncing twice adds no duplicates.
2. Forgot password: the email arrives and the reset works.
3. Google sign-in lands on `/dashboard`.
4. The policy card cites a page.
