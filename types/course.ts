export interface Course {
  id: string;
  title: string;
  monitor: string;
  coMonitor: string;
  attendance: number;
}
export interface Task {
  id: number;
  title: string;
  deadline: string;
  status: "active" | "upcoming" | "completed";
  points: number;
  submissions: number;
  totalStudents: number;
}
