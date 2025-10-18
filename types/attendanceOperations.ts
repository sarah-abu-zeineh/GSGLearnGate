import { AttendanceRecordStatus } from ".";

export type CourseScheduleList = {
  id: number;
  courseId: number;
  courseName: string;
  dayOfWeek: string | null;
  startTime: string;
  endTime: string;
};
export type CourseStudentsList = {
  status: AttendanceRecordStatus;
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};
