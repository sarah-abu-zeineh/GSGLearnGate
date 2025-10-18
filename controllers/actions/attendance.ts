"use server";

import { assignAttendance } from "@/services/attendance";
import { AttendanceRecordStatus } from "@/types/index";

export async function updateAttendanceAction(
  prevState: any,
  formData: FormData
) {
  const courseId = Number(formData.get("courseId"));
  const monitorId = Number(formData.get("monitorId"));
  const sessionId = Number(formData.get("sessionId"));
  const studentId = Number(formData.get("studentId"));
  const status = formData.get("status") as AttendanceRecordStatus;

  if (
    isNaN(courseId) ||
    isNaN(monitorId) ||
    isNaN(sessionId) ||
    isNaN(studentId) ||
    !status
  ) {
    return {
      success: false,
      message: "Please provide all the required fields with valid values.",
    };
  }

  try {
    await assignAttendance(courseId, monitorId, sessionId, studentId, status);

    return {
      success: true,
      message: `Attendance marked as ${status}`,
    };
  } catch {
    return {
      success: false,
      message: "Failed to update attendance",
    };
  }
}
