import CustomBarChart from "@/components/BarChart/CustomBarChart";
import StatisticCard from "@/components/StatisticCard/StatisticCard";
import { requireAuth } from "@/context/auth";
import { getMonitorTeachingStats } from "@/services/courses";
import { getMonitorCoursesNumber, getStudentsNumber } from "@/services/users";
import { Notebook, Student, UserCircle } from "@phosphor-icons/react/dist/ssr";
import React from "react";
const AdminDashboard = async () => {
  const { userId } = await requireAuth();
  const [totalStudents, totalCourses, coursesWithStudent] = await Promise.all([
    getStudentsNumber(userId),
    getMonitorCoursesNumber(userId),
    getMonitorTeachingStats(userId),
  ]);

  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, Monitor</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(400,_1fr))] gap-8 mt-4 mb-10">
        <StatisticCard
          title={"Total Students"}
          total={totalStudents}
          icon={<Student size={32} color="#FFA41F" weight="duotone" />}
        />

        <StatisticCard
          title={"Total Courses"}
          total={totalCourses}
          icon={<Notebook size={32} color="#FFA41F" weight="duotone" />}
        />
      </div>
      <CustomBarChart chartData={coursesWithStudent} />
    </div>
  );
};

export default AdminDashboard;
