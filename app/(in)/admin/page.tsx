export const dynamic = "force-dynamic";
import CustomBarChart from "@/components/BarChart/CustomBarChart";
import StatisticCard from "@/components/StatisticCard/StatisticCard";
import { fetchAllCourses, getCourses } from "@/services/courses";
import { fetchMonitors, fetchStudents } from "@/services/users";
import { Notebook, Student, UserCircle } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const AdminDashboard = async () => {
  const totalStudents = (await fetchStudents()).length;
  const totalMonitors = (await fetchMonitors()).length;
  const totalCourses = (await fetchAllCourses()).length;
  const coursesWithStudent = await getCourses(1, 5);
  const chartData =
    coursesWithStudent?.courses.map((course) => ({
      course: course.title,
      students: course.studentCount,
    })) || [];
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-8 mt-4 mb-10">
        <StatisticCard
          title={"Total Students"}
          total={totalStudents}
          icon={<Student size={32} color="#FFA41F" weight="duotone" />}
        />
        <StatisticCard
          title={"Total Monitors"}
          total={totalMonitors}
          icon={<UserCircle size={32} color="#FFA41F" weight="duotone" />}
        />
        <StatisticCard
          title={"Total Courses"}
          total={totalCourses}
          icon={<Notebook size={32} color="#FFA41F" weight="duotone" />}
        />
      </div>
      <CustomBarChart chartData={chartData} />
    </div>
  );
};

export default AdminDashboard;
