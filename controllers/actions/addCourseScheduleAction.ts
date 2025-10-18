"use server";

import { insertSchedule } from "@/services/courses";

export type CourseScheduleState =
  | { success: false; error: string; message: string; scheduleId: undefined }
  | { success: true; message: string; scheduleId: number; error?: undefined };

export async function submitCourseSchedule(
  state: CourseScheduleState,
  formData: FormData
): Promise<CourseScheduleState> {
  try {
    const startWeek = Number(formData.get("startWeek"));
    const duration = Number(formData.get("duration"));
    const daysOfWeek = formData.getAll("daysOfWeek") as string[];
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const isRecurring = formData.get("isRecurring") === "true";
    const specificDate = formData.get("specificDate")
      ? new Date(formData.get("specificDate") as string)
      : null;
    const courseId = Number(formData.get("courseId"));

    if (daysOfWeek.length === 0) {
      return {
        success: false,
        error: "Validation Error",
        message: "Please select at least one day of the week",
        scheduleId: undefined,
      };
    }

    if (duration < 1) {
      return {
        success: false,
        error: "Validation Error",
        message: "Duration must be at least 1 week",
        scheduleId: undefined,
      };
    }

    let lastInsertedId: number | undefined;
    let createdCount = 0;

    for (let weekOffset = 0; weekOffset < duration; weekOffset++) {
      const currentWeek = startWeek + weekOffset;
      for (const dayOfWeek of daysOfWeek) {
        const scheduleData = {
          weekNumber: currentWeek,
          dayOfWeek,
          startTime,
          endTime,
          isRecurring,
          specificDate,
          courseId,
        };

        const newSchedule = await insertSchedule(scheduleData);
        lastInsertedId = newSchedule.id;
        createdCount++;
      }
    }

    return {
      success: true,
      message: `Successfully created ${createdCount} schedule records`,
      scheduleId: lastInsertedId || 0,
    };
  } catch {
    return {
      success: false,
      error: "Server Error",
      message: "Failed to create schedules",
      scheduleId: undefined,
    };
  }
}
