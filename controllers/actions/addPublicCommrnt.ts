"use server";

import { db } from "@/src/db";
import { commentsTable, tasksTable } from "@/src/db/schema";
import { Role } from "@/types";
import { eq } from "drizzle-orm";

export async function insertPublicComment({
  TaskId,
  createById,
  text,
  role,
}: {
  TaskId: number;
  createById: number;
  text: string;
  role: string;
}) {
  try {
    const Task = await db
      .select({
        courseId: tasksTable.courseId,
      })
      .from(tasksTable)
      .where(eq(tasksTable.id, TaskId))
      .get();

    if (!Task) {
      throw new Error("Submission not found.");
    }

    if (role === Role.CO_MONITOR) {
      const [insertedComment] = await db
        .insert(commentsTable)
        .values({
          content: text,
          coMonitorId: createById,
          courseId: Task.courseId,
          taskId: TaskId,
          isPublic: true,
        })
        .returning();

      return insertedComment;
    } else if (role === Role.MONITOR) {
      const [insertedComment] = await db
        .insert(commentsTable)
        .values({
          content: text,
          monitorId: createById,
          courseId: Task.courseId,
          taskId: TaskId,
          isPublic: true,
        })
        .returning();

      return insertedComment;
    } else {
      const [insertedComment] = await db
        .insert(commentsTable)
        .values({
          content: text,
          studentId: createById,
          courseId: Task.courseId,
          taskId: TaskId,
          isPublic: true,
        })
        .returning();

      return insertedComment;
    }
  } catch {
    throw new Error("CODE:3015");
  }
}
