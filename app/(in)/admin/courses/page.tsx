import CoursesTable from "@/components/CoursesTable/CoursesTable";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const CoursesPage = () => {
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Courses</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/add-course"
            className="bg-[#FFA41F] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#ff9100] transition"
          >
            + Add Course
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Hi, Admin</span>
            <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
          </div>
        </div>
      </div>

      <CoursesTable />
    </div>
  );
};

export default CoursesPage;