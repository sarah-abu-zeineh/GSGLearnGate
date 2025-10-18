"use server";

import {
  getCoMonitorUserDetails,
  getPrivateCommentsBySubmission,
  getPrivateCommentsReplyBySubmission,
  getPublicCommentsByTaskId,
  getSubmissionById,
  getSubmissionsAndNonSubmissionsForTask,
  getTotalCoursesByCoMonitor,
  getTotalStudentsByCoMonitor,
  getTotalTasksByCoMonitor,
} from "@/src/db/queries/select";

import { Status, SubmissionsTask, User } from "@/types";
import { db } from "@/src/db";
import { submissionsTable, tasksTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function fetchSubmissions(
  taskId: number,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  submissions: SubmissionsTask[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
} | null> {
  try {
    const taskData = await db
      .select({
        courseId: tasksTable.courseId,
      })
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .all();

    if (!taskData || taskData.length === 0) {
      return null;
    }

    const courseId = taskData[0].courseId;

    const data = await getSubmissionsAndNonSubmissionsForTask(
      taskId,
      courseId,
      page,
      pageSize
    );

    if (!data) {
      throw new Error("CODE:600");
    }

    return {
      submissions: data.submissions,
      totalPages: Math.ceil(data.totalCount / pageSize),
      currentPage: page,
      totalCount: data.totalCount,
    };
  } catch {
    throw new Error("CODE:601");
  }
}
export async function fetchSubmissionById(submissionId: number) {
  try {
    const data = await getSubmissionById(submissionId);
    if (!data) {
      throw new Error("CODE:3022");
    }
    return data;
  } catch {
    throw new Error("CODE:3023");
  }
}

export async function fetchCommentsBySubmissionId(
  submissionId: number,
  ComentorId: number
) {
  try {
    const studentComments = await getPrivateCommentsBySubmission(submissionId);

    const coMentorReplies = await getPrivateCommentsReplyBySubmission(
      submissionId,
      ComentorId
    );

    const allComments = [...studentComments, ...coMentorReplies];

    allComments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    if (!allComments || allComments.length === 0) {
      return [];
    }

    return allComments;
  } catch {
    throw new Error("CODE:3024");
  }
}
export async function saveSubmissionData({
  submissionId,
  grade,
  feedback,
}: {
  submissionId: number;
  grade: number;
  feedback: string;
}) {
  try {
    if (!submissionId || grade === undefined || !feedback) {
      throw new Error(
        "Missing required fields: submissionId, grade, or feedback."
      );
    }

    await db
      .update(submissionsTable)
      .set({
        grade,
        feedback,
        gradedAt: new Date(),
        status: "GRADED",
      })
      .where(eq(submissionsTable.id, submissionId));

    return { success: true, message: "Submission data saved successfully." };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Failed to save submission data.",
        error: error.message,
      };
    }

    return {
      success: false,
      message: "Failed to save submission data.",
      error: "An unknown error occurred.",
    };
  }
}
export async function fetchPublicCommentsByTaskId(taskId: number) {
  try {
    const publicComments = await getPublicCommentsByTaskId(taskId);

    if (!publicComments || publicComments.length === 0) {
      return [];
    }

    return publicComments;
  } catch {
    throw new Error("CODE:3025");
  }
}
export async function fetchTotalStudentsByCoMonitor(
  coMonitorId: number
): Promise<number> {
  try {
    const totalStudents = await getTotalStudentsByCoMonitor(coMonitorId);
    return totalStudents;
  } catch {
    throw new Error("CODE:3026");
  }
}

export async function fetchTotalCoursesByCoMonitor(
  coMonitorId: number
): Promise<number> {
  try {
    const totalCourses = await getTotalCoursesByCoMonitor(coMonitorId);
    return totalCourses;
  } catch {
    throw new Error("CODE:3027");
  }
}

export async function fetchTotalTasksByCoMonitor(
  coMonitorId: number
): Promise<number> {
  try {
    const totalTasks = await getTotalTasksByCoMonitor(coMonitorId);
    return totalTasks;
  } catch {
    throw new Error("CODE:3028");
  }
}

export async function fetchCoMonitorUserDetails(
  coMonitorId: number
): Promise<User | null> {
  try {
    const userDetails = await getCoMonitorUserDetails(coMonitorId);
    return userDetails;
  } catch (error) {
    throw new Error("CODE:3030");
  }
}
