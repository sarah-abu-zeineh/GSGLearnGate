import React from "react";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import SendAnnouncementForm from "@/components/SendAnnouncementForm/SendAnnouncementForm";
import { Course } from "@/types";
import { fetchAllCourses } from "@/services/courses";

const SendAnnouncementPage = async() => {
  const courses: Course[]= await fetchAllCourses();
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Send Announcement</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <SendAnnouncementForm courses={courses} />
    </div>
  );
};

export default SendAnnouncementPage;
