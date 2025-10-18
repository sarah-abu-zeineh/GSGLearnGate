import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCoMonitorTasks } from "@/services/task";
import { TaskStatus } from "@/types";
import { getStudentsCountPerCourse } from "@/services/courses";

import { MonitorsTask } from "@/types/tasks";
import { useAuth } from "@/context/user";

const ITEMS_PER_PAGE = 10;

export function useCoMonitorTasks() {
  const router = useRouter();
  const searchParams = useSearchParams();
 const { user } = useAuth();
  const taskStatus =
    (searchParams.get("taskStatus") as TaskStatus) || TaskStatus.ALL;
  const page = Number(searchParams.get("page")) || 1;

  const [tasks, setTasks] = useState<MonitorsTask[]>([]);
  const [total, setTotal] = useState(0);
  const [_, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentCounts, setStudentCounts] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const { tasks, total } = await getCoMonitorTasks(
          user.userId ?? -1,
          taskStatus,
          page,
          ITEMS_PER_PAGE
        );

        const tempCounts: { [key: number]: number } = {};
        await Promise.all(
          tasks.map(async (task) => {
            if (task.courseId !== null && task.courseId !== undefined) {
              tempCounts[task.courseId] = await getStudentsCountPerCourse(
                task.courseId
              );
            } else {
              tempCounts[task.courseId] = 0;
            }
          })
        );

        setTasks(tasks);
        setTotal(total);
        setStudentCounts(tempCounts);
        setError(null);
      } catch  {
        setError("Error loading tasks");
      } finally {
        setLoading(false);
      }
    }

    try {
      fetchTasks();
    } catch {
      throw new Error("CODE:1000");
    }
  }, [taskStatus, page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const updatePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("taskStatus", taskStatus);
    newParams.set("page", String(newPage));
    router.push(`/co-monitor/tasks?${newParams.toString()}`, { scroll: false });
  };

  return {
    tasks,
    total,
    page,
    loading,
    studentCounts,
    totalPages,
    updatePage,
  };
}
