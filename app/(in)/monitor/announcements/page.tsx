import AnnouncementsTable from "@/components/AnnouncementsTable/AnnouncementsTable";
import { Newspaper, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { getMonitorCoursesNames } from "@/services/courses";
import { requireAuth } from "@/context/auth";
import Link from "next/link";

export default async function Page() {
  const { userId } = await requireAuth();

  const coursesList = await getMonitorCoursesNames(userId);

  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold max-sm:text-sm">Announcements</h1>
        <div className="flex items-center gap-2">
          <Link href="/monitor/announcements/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FFA41F] text-white rounded-md hover:bg-[#F59000]">
              <Newspaper size={18} />
              <span>Post Announcement</span>
            </button>
          </Link>
          <span className="text-gray-600">Hi, monitor</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <AnnouncementsTable monitorCoursesList={coursesList} />
    </div>
  );
}
