"use client";

import { Course, StudentAppointments } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  appointments: StudentAppointments[] | null;
  registeredCourses: Course[] | null;
}
const StudentAppointmentsTable = (props: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filteredAppointments, setFilteredAppointments] = useState(
    props.appointments
  );
  const [, setSelectedCourse] = useState("");

  useEffect(() => {
    const courseParam = searchParams.get("course") || "";
    setSelectedCourse(courseParam);

    if (!courseParam || !props.appointments) {
      setFilteredAppointments(props.appointments);
    } else {
      const filtered = props.appointments.filter(
        (appointment) => appointment.courseTitle === courseParam
      );
      setFilteredAppointments(filtered);
    }
  }, [searchParams, props.appointments]);

  const handleCourseFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("course", value);
    } else {
      newParams.delete("course");
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };
  return (
    <div data-testid="student-appointments-table" className="w-11/12 m-auto flex flex-col gap-5">
      <div className="space-y-2">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="course-filter"
            className="text-sm font-medium text-gray-700"
            data-testid="course-filter-label"
          >
            Filter by Course
          </label>
          <select
            id="course-filter"
            onChange={handleCourseFilter}
            className="px-3 py-2 border border-gray-300 rounded-md"
            data-testid="course-filter-select"
          >
            <option value="">All Courses</option>
            {props.registeredCourses?.map((course) => (
              <option key={course.id} value={course.title} data-testid="course-filter-option">
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="overflow-x-auto overflow-hidden border-2 border-gray-200 shadow-sm rounded-xl"
        data-testid="appointments-table-wrapper"
      >
        <table className="w-full max-w-full border-collapse bg-white text-sm" data-testid="appointments-table">
          <thead className="text-left text-xs text-gray-700 uppercase bg-gray-100">
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-left" data-testid="header-index">#</th>
              <th className="px-4 py-4 text-left" data-testid="header-course">Course</th>
              <th className="px-4 py-4 text-left" data-testid="header-comonitor">Co-Monitor</th>
              <th className="px-4 py-4 text-left" data-testid="header-date">Date</th>
              <th className="px-4 py-4 text-left" data-testid="header-time">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100" data-testid="appointments-tbody">
            {filteredAppointments && filteredAppointments?.length >= 1 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment.id} className="hover:bg-gray-50" data-testid="appointment-row">
                  <td className="px-4 py-4 font-medium text-gray-900" data-testid="appointment-index">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-gray-700" data-testid="appointment-course">
                    {appointment.courseTitle}
                  </td>
                  <td className="px-4 py-4 text-gray-700" data-testid="appointment-comonitor">
                    {appointment.coMonitor}
                  </td>
                  <td className="px-4 py-4 text-left text-gray-700" data-testid="appointment-date">
                    {appointment.date?.toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-4 text-gray-700" data-testid="appointment-time">
                    {appointment.startTime}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500" data-testid="no-appointments">
                  No appointments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAppointmentsTable;
