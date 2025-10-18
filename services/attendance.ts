import {
  getCourseSchedule,
  getStudentsByCourseId,
  insertAttendanceRecord,
} from "@/src/db/queries/select";
import { AttendanceRecordStatus } from "@/types/index";
import { CourseStudentsList } from "@/types/attendanceOperations";

export async function getCourseLectures(courseId?: number) {
  return await getCourseSchedule(courseId);
}
export async function listStudentInCourse(
  courseId: number
): Promise<CourseStudentsList[]> {
  return await getStudentsByCourseId(courseId);
}
export async function assignAttendance(
  courseId: number,
  recordedById: number,
  sessionId: number,
  studentId: number,
  status: AttendanceRecordStatus
) {
  return await insertAttendanceRecord({
    studentId,
    sessionId,
    recordedById,
    courseId,
    status,
  });
}
