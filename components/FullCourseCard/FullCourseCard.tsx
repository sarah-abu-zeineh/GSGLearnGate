import { StudentCourseBigCard } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  course: StudentCourseBigCard;
  studentId: number;
}

const FullCourseCard = ({ course }: IProps) => {
  const today = new Date();
  const courseStartDate = new Date(course.startDate);
  const courseEndDate = new Date(course.endDate);

  // Count course days (Sunday, Monday, Wednesday)
  const getCourseDaysCount = (start: Date, end: Date) => {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      if ([0, 1, 3].includes(current.getDay())) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  const courseDaysCount = getCourseDaysCount(courseStartDate, courseEndDate);
  const totalHours = courseDaysCount * 2;

  let completedDays = 0;
  const currentDay = new Date(courseStartDate);
  while (currentDay <= today && currentDay <= courseEndDate) {
    if ([0, 1, 3].includes(currentDay.getDay())) completedDays++;
    currentDay.setDate(currentDay.getDate() + 1);
  }

  let completedHours = 0;
  if (today < courseStartDate) completedHours = 0;
  else if (today > courseEndDate) completedHours = totalHours;
  else completedHours = completedDays * 2;

  const progressPercentage = Math.round((completedHours / totalHours) * 100);

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Progress</p>
          <p className="text-gray-600">{completedHours}/{totalHours} hours</p>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <span
            className="block h-full bg-[#FFA41F] rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700">Status</p>
          <p className="text-gray-600 font-medium">{course.status}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700">Start Date</p>
          <p className="text-gray-600">{courseStartDate.toLocaleDateString("en-GB")}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700">Assignments</p>
          <p className="text-gray-600">{course.completedTasks}/{course.totalTasks} completed</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700">Monitor</p>
          <p className="text-gray-600">{course.monitorName}</p>
        </div>
      </div>

      {course.status !== "Finished" && (
        <Link
          href={`/student/my-courses/${course.id}`}
          className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FF8A00] transition flex justify-center"
        >
          More Details
        </Link>
      )}
    </div>
  );
};

export default FullCourseCard;




