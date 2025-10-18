"use server";

import {
  getAllJoiningRequestsWithDetails,
  updateJoiningRequest,
} from "@/src/db/queries/select";
import { JoiningOrder, Status } from "@/types";

export async function getJoiningRequests(
  monitorId: number,
  courseId: number | undefined = undefined,
  currentPage: number,
  pageSize: number
) {
  return await getAllJoiningRequestsWithDetails(
    monitorId,
    courseId,
    currentPage,
    pageSize
  );
}

export async function updateJoiningRequestStatus(id: number, status: Status) {
  return await updateJoiningRequest(id, { joiningStatus: status });
}
