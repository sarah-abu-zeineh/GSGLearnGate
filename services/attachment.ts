"use server";

import { insertAttachment } from "@/src/db/queries/insert";
import { getAttachmentPathsByTaskId } from "@/src/db/queries/select";
import { Attachments } from "@/types";

export async function getAttachmentForTask(taskId: number, courseId: number) {
  return await getAttachmentPathsByTaskId(taskId, courseId);
}

export async function addAttachmentForTask(
  courseId: number,
  creatorId: number,
  path: string,
  taskId: number,
  type: Attachments
) {
  return await insertAttachment({
    courseId,
    creatorId,
    path,
    taskId,
    type,
  });
}
