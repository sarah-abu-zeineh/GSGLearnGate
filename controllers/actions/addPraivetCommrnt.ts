"use server";

import { db } from "@/src/db";
import { commentsTable, submissionsTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function insertCommentByCoMentor({
  submissionId,
  coMentorId,
  text,
}: {
  submissionId: number;
  coMentorId: number;
  text: string;
}) {
  try {
    const submission = await db
      .select({
        studentId: submissionsTable.studentId,
        courseId: submissionsTable.courseId,
        taskId: submissionsTable.taskId,
      })
      .from(submissionsTable)
      .where(eq(submissionsTable.id, submissionId))
      .get();

    if (!submission) {
      throw new Error("Submission not found.");
    }

    const [insertedComment] = await db
      .insert(commentsTable)
      .values({
        content: text,
        coMonitorId: coMentorId,
        courseId: submission.courseId,
        submissionId: submissionId,
        taskId: submission.taskId,
        isPublic: false,
        privateRecipientId: submission.studentId,
      })
      .returning();

    return insertedComment;
  } catch {
    throw new Error("CODE:3012");
  }
}
