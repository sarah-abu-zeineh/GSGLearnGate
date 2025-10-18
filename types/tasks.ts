import { Task } from "./course";

export interface MonitorsTask extends Task {
  courseTitle: string | null;
  courseId: number;
  submissionCount: number;
  studentCount: number;
}

export interface MonitorTasksResponse {
  tasks: MonitorsTask[];
  total: number;
}
