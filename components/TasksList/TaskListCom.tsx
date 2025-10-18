"use client";
import {
  CalendarBlank,
  DotsThree,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { isTaskActive } from "@/utils/index";
import { MonitorsTask } from "@/types/tasks";
import Link from "next/link";
import { TaskStatus } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TempPagination from "../Pagination/TempPagination";
import Loader from "../Shared/Loader";

export default function TaskListClient({
  initialTasks,
  initialTotal,
  initialPage,
  initialStatus,
}: {
  initialTasks: MonitorsTask[];
  initialTotal: number;
  initialPage: number;
  initialStatus: TaskStatus;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ITEMS_PER_PAGE = 10;

  const [tasks, setTasks] = useState(initialTasks);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  const taskStatus =
    (searchParams.get("taskStatus") as TaskStatus) || initialStatus;
  const page = Number(searchParams.get("page")) || initialPage;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/monitor/tasks?status=${taskStatus}&page=${page}&limit=${ITEMS_PER_PAGE}`
        );
        const { tasks, total } = await res.json();
        setTasks(tasks);
        setTotal(total);
      } catch {
        throw new Error("CODE:1009");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [page, taskStatus, initialPage, initialStatus]);

  const updatePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("taskStatus", taskStatus);
    newParams.set("page", String(newPage));
    router.push(`/monitor/tasks?${newParams.toString()}`, { scroll: false });
  };

  const handleNextPage = () => page < totalPages && updatePage(page + 1);
  const handlePreviousPage = () => page > 1 && updatePage(page - 1);
  const onPageChange = (newPage: number) => updatePage(newPage);

  if (loading && initialTotal > 0) {
    return <Loader data-testid="loader" message="Loading data..." />;
  }

  return tasks.length > 0 ? (
    <div
      className="bg-white border border-[#FFA41F]/30 rounded-lg overflow-hidden mb-6 shadow-sm"
      data-testid="task-list-container"
    >
      <div
        className="grid grid-cols-12 bg-[#FFA41F]/10 p-4 border-b border-[#FFA41F]/20 font-medium text-[#FFA41F]"
        data-testid="task-list-header"
      >
        <div className="col-span-6">Task</div>
        <div className="col-span-2 text-center hidden md:block">Deadline</div>
        <div className="col-span-2 text-center hidden md:block">Status</div>
        <div className="col-span-2 text-center hidden md:block">Points</div>
      </div>

      {tasks.map((task, index) => {
        return (
          <div
            key={task.id}
            className={`grid grid-cols-12 p-4 border-b border-gray-100 hover:bg-[#FFA41F]/5 transition-colors ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
            data-testid={`task-row-${task.id}`}
          >
            <div
              className="col-span-12 md:col-span-6 mb-2 md:mb-0"
              data-testid={`task-title-${task.id}`}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <Link
                    href={`/monitor/tasks/${task.id}`}
                    data-testid={`task-link-${task.id}`}
                  >
                    <h3 className="font-medium text-[#FFA41F]">
                      {task.title}
                    </h3>
                  </Link>
                  <div
                    className="flex items-center mt-1 text-sm text-gray-500 md:hidden"
                    data-testid={`task-deadline-mobile-${task.id}`}
                  >
                    <CalendarBlank size={14} className="mr-1" />
                    <span className="mr-3">
                      {new Date(task.deadline).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div
                    className="flex items-center mt-1 text-sm text-gray-500"
                    data-testid={`task-submissions-${task.id}`}
                  >
                    <span>
                      Submissions: {task.submissionCount}/{task.studentCount}
                    </span>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full ml-2">
                      <div
                        className="h-full bg-[#FFA41F] rounded-full"
                        style={{
                          width: `${
                            (task.submissionCount / task.studentCount) * 100
                          }%`,
                        }}
                        data-testid={`task-progress-${task.id}`}
                      ></div>
                    </div>
                  </div>
                </div>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 md:hidden"
                  data-testid={`task-menu-button-${task.id}`}
                >
                  <DotsThree size={20} weight="bold" />
                </button>
              </div>
            </div>

            <div
              className="col-span-2 flex items-center justify-center md:flex"
              data-testid={`task-deadline-${task.id}`}
            >
              <div className="flex items-center">
                <Clock size={16} className="mr-1 text-[#FFA41F]" />
                <span>
                  {new Date(task.deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div
              className="col-span-2 flex items-center justify-center md:flex"
              data-testid={`task-status-${task.id}`}
            >
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  isTaskActive(task) === true
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {isTaskActive(task) ? "Completed" : "In Progress"}
              </span>
            </div>

            <div
              className="col-span-2 hidden md:flex"
              data-testid={`task-points-${task.id}`}
            >
              <div className="flex items-center justify-center w-full">
                <div className="text-[#FFA41F] px-2 py-1 rounded-md font-medium">
                  {task.points?.toString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-9" data-testid="task-pagination">
        <TempPagination
          currentPage={page}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  ) : (
    <h1 className="text-center" data-testid="no-tasks-message">
      there is no tasks to view
    </h1>
  );
}
