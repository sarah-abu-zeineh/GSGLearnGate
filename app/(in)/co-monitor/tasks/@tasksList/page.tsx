import { TaskStatus } from "@/types";
import { getTasksWithSubmissionsByCoMonitors } from "@/services/task";
import TaskList from "@/components/TasksList/TaskList";
import { requireAuth } from "@/context/auth";
import SelectTaskStatus from "@/components/Dropdowns/SelectTaskStatus";

const ITEMS_PER_PAGE = 10;

export default async function CoMonitorTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ taskStatus?: TaskStatus; page?: string }>;
}) {
  const params = await searchParams;
  const { userId } = await requireAuth();
  const taskStatus = params.taskStatus || TaskStatus.ALL;
  const page = Number(params.page) || 1;

  const { tasks, total } = await getTasksWithSubmissionsByCoMonitors(
    userId,
    taskStatus,
    page,
    ITEMS_PER_PAGE
  );

  return (
    <div>
      {total > 0 ? (
        <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-3 mb-6 shadow-sm">
          <div className="flex justify-end flex-col md:flex-row gap-4">
            <SelectTaskStatus value={1} appendSearchParams={true} />
          </div>
        </div>
      ) : null}
      <TaskList
        initialTasks={tasks}
        initialTotal={total}
        initialPage={page}
        initialStatus={taskStatus}
      />{" "}
    </div>
  );
}
