import { NextResponse } from "next/server";
import { getTasksWithSubmissions } from "@/services/task";
import { TaskStatus } from "@/types";
import { requireAuth } from "@/context/auth";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { userId } = await requireAuth();

  try {
    const status = (searchParams.get("status") as TaskStatus) || TaskStatus.ALL;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 2;
    const data = await getTasksWithSubmissions(userId, status, page, limit);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
