import { insertComment } from "@/src/db/queries/insert";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newComment = await insertComment({
      content: body.content,
      studentId: Number(body.studentId),
      taskId: Number(body.taskId),
      courseId: Number(body.courseId),
      isPublic: body.isPublic,
      submissionId: Number(body.submissionId) || null,
    });

    return NextResponse.json(newComment, { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
