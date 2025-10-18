"use server";

import { addAvailableAppointment } from "@/services/availability";

export async function saveAvailability(prevState: any, formData: FormData) {
  try {
    const courseId = Number(formData.get("courseId"));
    const coMonitorId = Number(formData.get("coMonitorId"));
    let date: string | Date = formData.get("date") as string;
    date = new Date(date);
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const appointment = await addAvailableAppointment(
      coMonitorId,
      courseId,
      date,
      startTime,
      endTime
    );
    if (appointment) {
      return {
        success: true,
        message: "Availability saved successfully",
        errors: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to save availability",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
