import { insertAttachment } from "@/src/db/queries/insert";
import { insertSubmission } from "@/src/db/queries/insert";
import { AssignmentStatus, Attachments } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const insertedAttachment = await insertAttachment({
      taskId: Number(body.taskId),
      creatorId: Number(body.studentId),
      courseId: Number(body.courseId),
      type:
        body.submissionType === "link" ? Attachments.LINK : Attachments.FILE,
      path: body.path,
    });

    const insertedSubmission = await insertSubmission({
      taskId: Number(body.taskId),
      studentId: Number(body.studentId),
      courseId: Number(body.courseId),
      grade: null,
      feedback: "",
      gradedAt: new Date(),
      status: AssignmentStatus.SUBMITTED,
      attachmentId: insertedAttachment.id,
    });

    return NextResponse.json(
      { insertedAttachment, insertedSubmission },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send Attachment failed:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
