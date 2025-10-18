export interface MonitorsTasks {
  id: number;
  title: string;
  description: string;
  courseId: number;
  startedAt: Date;
  deadline: Date;
  points: number | null;
  createdAt: string;
  updatedAt: string;
  courseTitle: string | null;
  submissionCount: number;
  studentCount: number;
}

export interface MonitorTasksResponse {
  tasks: MonitorsTasks[];
  total: number;
}
