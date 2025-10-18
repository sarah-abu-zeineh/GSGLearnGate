"use server";
import { Difficulty } from "@/types";
import { addCourse } from "@/services/courses";
import { writeFile } from "@/utils/writeFile";

export type CourseState =
  | { success: false; error: string; message: string; courseId: undefined }
  | { success: true; message: string; courseId: number; error?: undefined };

export async function submitCourse(
  state: CourseState,
  formData: FormData
): Promise<CourseState> {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const difficulty = formData.get("difficulty") as Difficulty;
    const duration = Number(formData.get("duration"));
    const applyStartDate = new Date(formData.get("applyStartDate") as string);
    const applyEndDate = new Date(formData.get("applyEndDate") as string);
    const courseStartDate = new Date(formData.get("courseStartDate") as string);
    const courseEndDate = new Date(formData.get("courseEndDate") as string);
    const monitorId = Number(formData.get("monitorId"));
    const coMonitorId = Number(formData.get("coMonitorId"));
    const adminId = Number(formData.get("adminId"));
    const details = formData.get("details") as string;
    const entryRequirements = formData.get("entryRequirements") as string;

    if (
      !title ||
      !description ||
      !applyStartDate ||
      !applyEndDate ||
      !courseStartDate ||
      !courseEndDate
    ) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
        courseId: undefined,
      };
    }

    const image = formData.get("image") as File | null;
    let publicFilePath: string = "";

    if (image) {
      publicFilePath = await writeFile(image);
    }

    const newCourse = await addCourse({
      title,
      description,
      image: publicFilePath,
      difficulty,
      duration,
      applyStartDate,
      applyEndDate,
      courseStartDate,
      courseEndDate,
      monitorId,
      coMonitorId,
      adminId,
      details,
      entryRequirements,
    });

    return {
      success: true,
      message: "Course creation successful.",
      courseId: newCourse.id,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
      message: "Course creation failed.",
      courseId: undefined,
    };
  }
}
