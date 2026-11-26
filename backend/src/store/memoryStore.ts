// Benjamin Martinez

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface CourseRecord {
  id: string;
  userId: string;
  code: string;
  title: string;
  term?: string;
  deadlines: DeadlineItem[];
}

// Temporary in-memory stores until MongoDB persistence is connected
export const users: UserRecord[] = [];
export const courses: CourseRecord[] = [];
