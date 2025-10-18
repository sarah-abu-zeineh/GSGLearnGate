import { MonitorsTask } from "@/types/tasks";

export function isTaskActive(task: MonitorsTask): boolean {
  const now = new Date();
  return new Date(task.deadline) < now;
}
export function getTimeRemaining(createdAt: string | Date): string {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = createdDate.getTime() - now.getTime();
  if (diffMs <= 0) return "Time expired";
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
  const parts: string[] = [];
  if (diffDays > 0) parts.push(`${diffDays} day${diffDays > 1 ? "s" : ""}`);
  if (diffHrs > 0) parts.push(`${diffHrs} hour${diffHrs > 1 ? "s" : ""}`);
  if (diffMins > 0) parts.push(`${diffMins} minute${diffMins > 1 ? "s" : ""}`);
  if (diffSecs > 0) parts.push(`${diffSecs} second${diffSecs > 1 ? "s" : ""}`);

  return parts.length > 0
    ? `${parts.join(", ")} remaining`
    : "Less than a second remaining";
}
