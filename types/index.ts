export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  MONITOR = "MONITOR",
  CO_MONITOR = "CO_MONITOR",
}

export enum Difficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum Status {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum TaskStatus {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  ALL = "All",
}

export enum AssignmentStatus {
  PENDING = "PENDING",
  GRADED = "GRADED",
  NOTSUBMITTED = "NOT SUBMITTED",
  SUBMITTED = "SUBMITTED",
}

export enum Attachments {
  LINK = "LINK",
  FILE = "FILE",
}

interface Timestamps {
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  image: string;
  role: Role;
  city: string;
} & Timestamps;

export type Admin = {
  id: number;
  userId: number;
};

export type Monitor = {
  id: number;
  userId: number;
};

export type CoMonitor = {
  id: number;
  userId: number;
};

export type Student = {
  id: number;
  userId: number;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: Difficulty;
  duration: number;
  applyStartDate: Date;
  applyEndDate: Date;
  courseStartDate: Date;
  courseEndDate: Date;
  monitorId: number | null;
  monitorName?: string;
  coMonitorId: number | null;
  coMonitorName?: string;
  adminId: number | null;
  details: string;
  entryRequirements: string;
} & Timestamps;

export type Announcement = {
  id: number;
  postedBy: number;
  courseId: number;
  title: string;
  description: string;
} & Timestamps;

export type Appointment = {
  id: number;
  coMonitorId: number;
  studentId: number;
  caption: string;
  date: Date;
  status: Status;
} & Timestamps;

export type StudentCourse = {
  id: number;
  courseId: number;
  studentId: number;
} & Timestamps;

export type Task = {
  id: number;
  creatorId: number;
  courseId: number;
  title: string;
  description: string;
  startedAt: Date;
  deadline: Date;
  points?: number;
} & Timestamps;

export type CourseJoinStudent = {
  id: number;
  title: string;
  difficulty: Difficulty;
  monitorId: number | null;
  monitorName: string | null;
  coMonitorId: number | null;
  coMonitorName: string | null;
  studentCount: number;
};
export type SubmissionsTask = {
  submissionId: number;
  studentId: number;
  studentName: string;
  email: string;
  submissionDate: string;
  status: AssignmentStatus;
  grade: number | null;
  profilePicture: string;
  taskName: string;
  courseName: string;
  taskId: number;
  points: number | null;
} & Timestamps;

export type Submission = {
  id: number;
  taskId: number;
  studentId: number;
  courseId: number;
  grade: number | null;
  feedback: string;
  gradedAt: Date;
  status: AssignmentStatus;
  attachmentId: number;
} & Timestamps;

export type Attachment = {
  id: number;
  taskId: number;
  creatorId: number;
  courseId: number;
  type: Attachments;
  path: string;
} & Timestamps;

export type Attendance = {
  id: number;
  studentId: number;
  courseId: number;
  absence: number | null;
} & Timestamps;

export type JoiningRequest = {
  id: number;
  studentId: number;
  courseId: number;
  interviewStatus: Status;
  joiningStatus: Status;
} & Timestamps;

export interface JoiningOrdersResponse {
  totalPages: number;
  JoiningOrders: JoiningOrder[];
}
export interface JoiningOrder {
  id: number;
  courseId: number | null;
  studentId: number | null;
  courseName: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  image: string | null;
  interviewStatus: Status;
  joiningStatus: Status;
}
export interface StudentCourseChart {
  course: string;
  students: number;
}

export interface AppointmentWithStudent {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  profileImage: string;
  caption: string;
  date: string;
  status: Status;
  createdAt: string;
  courseName: string;
}
export interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  request: AppointmentWithStudent;
}

export type MonitorsJoinUsers = {
  id: number;
  userId: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  image: string | null;
  role: Role | null;
  city: string | null;
};

export type UsersNames = {
  id: number;
  userId: number;
  firstName: string | null;
  lastName: string | null;
};

export type CourseWithNames = {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: Difficulty;
  duration: number;
  applyStartDate: Date;
  applyEndDate: Date;
  courseStartDate: Date;
  courseEndDate: Date;
  monitorId: number | null;
  monitorName?: string | null;
  coMonitorId: number | null;
  coMonitorName?: string | null;
  adminId: number | null;
  details: string;
  entryRequirements: string;
} & Timestamps;

enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  EXCUSED = "EXCUSED",
  LATE = "LATE",
}
export type StudentCourseSmallCard = {
  id: number | null;
  title: string | null;
  monitorName: string | null;
  duration: number;
  startDate: number;
  endDate: number;
};

export enum CourseStatus {
  "NOT STARTED" = "Not Started",
  "IN PROGRESS" = "In Progress",
  "FINISHED" = "Finished",
}
export type StudentCourseBigCard = {
  status: CourseStatus;
  startDate: Date;
  endDate: Date;
  totalTasks: number;
  completedTasks: number;
  applyEndDate: number;
  description: string;
  details: string;
  entryRequirements: string;
} & StudentCourseSmallCard;

export type StudentCourseDetails = {
  id: number | null;
  title: string | null;
  monitor: string | null;
  description: string | null;
  coMonitors: string | null;
  startDate: Date;
  endDate: Date;
  applyEndDate: number;
  details: string;
  entryRequirements: string;
  duration: number;
};

export enum StudentAppointmentStatus {
  "PENDING" = "Pending",
  "ACCEPTED" = "Accepted",
  "REJECTED" = "Rejected",
}

export type StudentAppointments = {
  id: number | null;
  coMonitor: string | null;
  date: Date;
  startTime: string;
  courseTitle: string;
};

export enum StudentTaskStatus {
  "PENDING" = "PENDING",
  "SUBMITTED" = "SUBMITTED",
  "GRADED" = "GRADED",
}
export type StudentCourseTasks = {
  taskId: number;
  taskTitle: string;
  deadline: Date;
  status: StudentTaskStatus;
  grade: number;
  gradedAt: Date;
  maxGrade: number;
  coMonitor: string;
};
export interface SubmissionView {
  id: number;
  taskId: number;
  studentId: number;
  courseId: number;
  grade: number | null;
  feedback: string | null;
  gradedAt: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  StudentName: string;
  StudentEmail: string | null;
  StudentImage: string | null;
  TaskTitle: string | null;
  points: number | null;
}

export interface SubmissionAttachment {
  attachmentId: number;
  attachmentPath: string;
  attachmentType?: Attachments;
}

export interface PrivateComment {
  commentId: number;
  commentText: string;
  createdAt: Date;
  createdBy: string;
  image: string | null;
}
export type StudentCourseTaskDetails = {
  grade: number;
  gradedAt: Date;
  maxGrade: number;
};

export type StudentCourseTask = {
  courseTitle: string;
  taskTitle: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  deadline: Date;
};

export type coMonitorName = {
  coMonitorId: number;
  coMonitorName: string;
};

export type StudentBookingDate = {
  id: number;
  coMonitorId: number;
  studentId: number;
  courseId: number;
  caption: string;
  dateTime: Date;
  status: Status;
} & Timestamps;

export type Comment = {
  content: string;
  studentId: number;
  submissionId: number;
  courseId: number;
  isPublic: boolean;
  privateRecipientId: number;
};
export type CourseSchedule = {
  id: number;
  courseId: number;
  dayOfWeek: string | null;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  specificDate: Date | null;
} & Timestamps;
export type AvailabilitySlot = {
  id: number;
  coMonitorId: number;
  courseId: number;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedByStudentId: number | null;
  createdAt: string;
  updatedAt: string;
};
export enum AttendanceRecordStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  EXCUSED = "EXCUSED",
}
export type AttendanceRecord = {
  id: number;
  courseId: number;
  sessionId: number;
  status: AttendanceRecordStatus;
  recordedById: number;
  studentId: number;
};

export type CourseWithPresenter = Course & {
  presenterName?: string;
  presenterImage?: string;
};

export type AttendanceRecordOne = {
  attendanceStatus: AttendanceRecordStatus;
};

export type Comments = {
  id: number;
  content: string;
  userName: string;
  isPublic: boolean;
  createdAt: string;
  submissionId: number | null;
};

export type SubmissionId = {
  SubmissionId: number;
};

export type newComment = {
  taskId: number;
} & Comment;

export type newAnnouncements = {
  courseTitle: string;
} & Announcement;

export interface PublicComment {
  commentId: number;
  commentText: string;
  createdAt: string;
  isPublic: boolean;
  userName: string;
  userEmail: string | null;
  userImage: string | null;
  userType: string;
}

export type StudentSubmission = {
  path: string;
  feedback: string;
};

export type StudentName = {
  id: number;
  name: string;
};

export type SubmissionIdNum = {
  id: string | null;
};
