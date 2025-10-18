import { StudentCourseTasks, StudentTaskStatus } from "@/types";
import Link from "next/link";

interface IProps {
  task: StudentCourseTasks;
  courseId: string;
  studentId: number;
}

const TaskCard = (props: IProps) => {
  const statusBg = {
    GRADED: "bg-green-100 text-green-600",
    SUBMITTED: "bg-yellow-100 text-yellow-600",
    PENDING: "bg-gray-100 text-gray-600",
    LATE: "Bg-red-100 text-red-600",
  };

  return (
    <Link
      href={`/student/my-courses/${props.courseId}/tasks/${props.task.taskId}`}
      className="block w-full"
      data-testid={`task-link-${props.task.taskId}`}
    >
      <div className="w-full border rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
          <div>
            <h2
              className="text-xl font-semibold text-[#FFA41F]"
              data-testid={`task-title-${props.task.taskId}`}
            >
              {props.task.taskTitle}
            </h2>
            <p
              className="text-sm text-neutral-600"
              data-testid={`task-deadline-${props.task.taskId}`}
            >
              Deadline: {props.task.deadline.toLocaleDateString("en-GB")}{" "}
              {props.task.deadline.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              props.task.status
                ? statusBg[props.task.status]
                : statusBg[StudentTaskStatus.PENDING]
            }`}
            data-testid={`task-status-${props.task.taskId}`}
          >
            Status:{" "}
            {props.task.status ? props.task.status : StudentTaskStatus.PENDING}
          </span>

          <div className="flex flex-col sm:items-end text-sm">
            <p
              className="text-neutral-800 font-medium"
              data-testid={`task-grade-${props.task.taskId}`}
            >
              Grade: {props.task.grade ? props.task.grade : "N/A"} /{" "}
              {props.task.maxGrade}
            </p>
            <p
              className="text-neutral-600"
              data-testid={`task-gradedAt-${props.task.taskId}`}
            >
              Graded At:{" "}
              {props.task.grade
                ? props.task.gradedAt.toLocaleDateString("en-GB")
                : "_"}{" "}
              {props.task.grade
                ? props.task.gradedAt.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </p>
            <p
              className="text-neutral-600"
              data-testid={`task-gradedBy-${props.task.taskId}`}
            >
              Graded By: {props.task.grade ? props.task.coMonitor : "_"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
