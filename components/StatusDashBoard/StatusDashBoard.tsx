"use client";
import React, { useEffect, useState } from "react";
import { GraduationCap, Books, CheckCircle, Spinner } from "phosphor-react";
import {
  fetchTotalStudentsByCoMonitor,
  fetchTotalCoursesByCoMonitor,
  fetchTotalTasksByCoMonitor,
} from "@/services/co-mentor-func";
import { getCoMonitorTeachingStats } from "@/services/courses";
import CustomBarChart from "@/components/BarChart/CustomBarChart";

const StatusDashBoard = ({ coMonitorId }: { coMonitorId: number }) => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [courses, setCourses] = useState<
    { course: string; students: number }[]
  >([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
  const [loadingChart, setLoadingChart] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        setLoadingStudents(true);
        const students = await fetchTotalStudentsByCoMonitor(coMonitorId);
        setTotalStudents(students);
        setLoadingStudents(false);

        setLoadingCourses(true);
        const courses = await fetchTotalCoursesByCoMonitor(coMonitorId);
        setTotalCourses(courses);
        setLoadingCourses(false);

        setLoadingTasks(true);
        const tasks = await fetchTotalTasksByCoMonitor(coMonitorId);
        setTotalTasks(tasks);
        setLoadingTasks(false);
        setLoadingChart(true);
        const teachingStats = await getCoMonitorTeachingStats(coMonitorId);
        setCourses(teachingStats);
        setLoadingChart(false);
      } catch {
        setError("Failed to load dashboard data.");
      }
    };

    fetchData();
  }, [coMonitorId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const LoadingSpinner = () => (
    <Spinner className="animate-spin text-[#FFA41F]" size={32} weight="bold" />
  );

  return (
    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Students</h3>
            <p className="text-2xl font-bold flex items-center gap-2">
              {loadingStudents ? <LoadingSpinner /> : totalStudents}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFA41F]/10 flex items-center justify-center">
            <GraduationCap size={24} className="text-[#FFA41F]" />
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Courses</h3>
            <p className="text-2xl font-bold flex items-center gap-2">
              {loadingCourses ? <LoadingSpinner /> : totalCourses}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFA41F]/10 flex items-center justify-center">
            <Books size={24} className="text-[#FFA41F]" />
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Tasks</h3>
            <p className="text-2xl font-bold flex items-center gap-2">
              {loadingTasks ? <LoadingSpinner /> : totalTasks}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFA41F]/10 flex items-center justify-center">
            <CheckCircle size={24} className="text-[#FFA41F]" />
          </div>
        </div>
      </div>

      <div className="md:col-span-3 bg-[#F8FAFC] p-4 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-gray-700 font-medium mb-4">Students per Course</h3>
        {loadingChart ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <CustomBarChart chartData={courses} />
        )}
      </div>
    </div>
  );
};

export default StatusDashBoard;
