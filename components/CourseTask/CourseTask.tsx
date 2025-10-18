import { StudentCourseTasks, StudentTaskStatus } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  task: StudentCourseTasks;
  number: number;
  courseId: string;
  studentId: number;
}

const CourseTask = (props: IProps) => {
  const { task, number, courseId } = props;

  return (
    <Link
      href={`/student/my-courses/${courseId}/tasks/${task.taskId}`}
      className="p-4"
      data-testid={`course-task-link-${task.taskId}`}
    >
      <div
        className="p-4 bg-white shadow rounded-lg"
        data-testid={`course-task-card-${task.taskId}`}
      >
        <h3
          className="text-lg font-semibold"
          data-testid={`course-task-title-${task.taskId}`}
        >
          Assignment {number}: {task.taskTitle}
        </h3>
        <p
          className="text-sm text-gray-500"
          data-testid={`course-task-meta-${task.taskId}`}
        >
          Deadline: {task.deadline.toLocaleDateString("en-GB")}{" "}
          {task.deadline.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          | Status: {task.status ? task.status : StudentTaskStatus.PENDING}
        </p>
      </div>
    </Link>
  );
};

export default CourseTask;
