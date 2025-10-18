"use server";

import { insertTask } from "@/src/db/queries/insert";
import {
  getMonitorTasksDeadlines,
  getMonitorSubmissionsNotGradedCount,
  getTasksByMonitor,
  getTaskById,
  getTasksByCoMonitor,
  getCoMonitorTasksDeadlines,
  getCoMonitorSubmissionsNotGradedCount,
} from "@/src/db/queries/select";
import { TaskStatus } from "@/types";
import {
  getTaskSubmissionsOverStudentsCount,
  getTaskSubmissionsOverStudentsCountByCoMonitor,
} from "./submission";

export async function createTaskByMonitor(
  creatorId: number,
  courseId: number,
  deadline: Date,
  startedAt: Date,
  title: string,
  description: string,
  points: number
) {
  return await insertTask({
    creatorId,
    title,
    courseId,
    deadline,
    description,
    startedAt,
    points,
  });
}
export async function createTaskByCoMonitor(
  creatorId: number,
  courseId: number,
  deadline: Date,
  startedAt: Date,
  title: string,
  description: string,
  points: number
) {
  return await insertTask({
    creatorId,
    title,
    courseId,
    deadline,
    description,
    startedAt,
    points,
  });
}
export async function getMonitorTasks(
  monitorId: number,
  status: TaskStatus,
  page: number = 1,
  pageSize: number = 10
) {
  return await getTasksByMonitor(monitorId, status, page, pageSize);
}
export async function getCoMonitorTasks(
  CoMonitorId: number,
  status: TaskStatus,
  page: number = 1,
  pageSize: number = 10
) {
  return await getTasksByCoMonitor(CoMonitorId, status, page, pageSize);
}
export async function getActiveTasksCount(monitorId: number) {
  const today = new Date();
  const dates = await getMonitorTasksDeadlines(monitorId);
  let count = 0;
  dates.forEach((date: Date) => {
    if (date > today) {
      count++;
    }
  });
  return count;
}
export async function getActiveTasksCoMonitorCount(coMonitorId: number) {
  const today = new Date();
  const dates = await getCoMonitorTasksDeadlines(coMonitorId);
  let count = 0;
  dates.forEach((date: Date) => {
    if (date > today) {
      count++;
    }
  });
  return count;
}

export async function getNotGradedSubmissionsCount(monitorId: number) {
  return await getMonitorSubmissionsNotGradedCount(monitorId);
}
export async function getNotGradedSubmissionsCoMonitorCount(
  coMonitorId: number
) {
  return await getCoMonitorSubmissionsNotGradedCount(coMonitorId);
}
export async function getTask(taskId: number) {
  return await getTaskById(taskId);
}

export async function getTasksWithSubmissions(
  monitorId: number,
  taskStatus: TaskStatus,
  page: number,
  itemsPerPage: number
) {
  const { tasks, total } = await getMonitorTasks(
    monitorId,
    taskStatus,
    page,
    itemsPerPage
  );

  const tasksWithCounts = await Promise.all(
    tasks.map(async (task) => {
      try {
        const { studentCount, submissionCount } =
          await getTaskSubmissionsOverStudentsCount(monitorId, task.id);
        return {
          ...task,
          submissionCount,
          studentCount,
        };
      } catch (error) {
        throw new Error("CODE:1008");
      }
    })
  );

  return {
    tasks: tasksWithCounts,
    total,
  };
}
export async function getTasksWithSubmissionsByCoMonitors(
  coMonitorId: number,
  taskStatus: TaskStatus,
  page: number,
  itemsPerPage: number
) {
  const { tasks, total } = await getCoMonitorTasks(
    coMonitorId,
    taskStatus,
    page,
    itemsPerPage
  );

  const tasksWithCounts = await Promise.all(
    tasks.map(async (task) => {
      try {
        const { studentCount, submissionCount } =
          await getTaskSubmissionsOverStudentsCountByCoMonitor(
            coMonitorId,
            task.id
          );
        return {
          ...task,
          submissionCount,
          studentCount,
        };
      } catch (error) {
        throw new Error("CODE:1008");
      }
    })
  );

  return {
    tasks: tasksWithCounts,
    total,
  };
}
