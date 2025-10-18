import TaskCard from "@/components/TaskCard/TaskCard";
import { requireAuth } from "@/context/auth";
import { getTasksByCourseId } from "@/src/db/queries/select";

interface IProps {
  params: Promise<{ courseId: string }>;
}
const Tasks = async (props: IProps) => {
  const { courseId } = await props.params;
  const data = await requireAuth();
  const studentId = data.userId;
  const courseTasks = await getTasksByCourseId(Number(courseId));

  return (
    <div className="min-h-screen bg-neutral-50 p-6 w-screen">
      <h1 className="text-3xl font-bold text-[#FFA41F] mb-6">
        Tasks & Assignments
      </h1>

      <div className="space-y-6 w-full">
        {courseTasks?.map((task, index) => {
          return (
            <TaskCard
              key={index}
              task={task}
              courseId={courseId}
              studentId={studentId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
