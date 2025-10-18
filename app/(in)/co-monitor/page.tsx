import ProfileCard from "@/components/ProfileCard/ProfileCard";
import StatusDashBoard from "@/components/StatusDashBoard/StatusDashBoard";
import { requireAuth } from "@/context/auth";

import {
  Calendar,
  Newspaper,
  Plus,
  User,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function CoMonitorDashboard() {
  const user = await requireAuth();
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="flex gap-3">
            <Link href={"/co-monitor/tasks/create"}>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFA41F] text-white rounded-md hover:bg-[#F59000]">
                <Plus size={18} />
                <span>Create Task</span>
              </button>
            </Link>
            <Link href="/co-monitor/announcements/create">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFA41F] text-white rounded-md hover:bg-[#F59000]">
                <Newspaper size={18} />
                <span>Post Announcement</span>
              </button>
            </Link>
            <Link href="/co-monitor/availability">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#FFA41F] text-[#FFA41F] rounded-md hover:bg-[#FFA41F]/5">
                <Calendar size={18} />
                <span>Schedule Meeting</span>
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Hi, Co-Monitor</span>
            <div className="w-8 h-8 rounded-full bg-[#FFA41F] flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <StatusDashBoard coMonitorId={user.userId} />
        <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-100 shadow-sm h-full flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-14">
            Co-Monitor Profile
          </h2>
          <div className="w-full">
            <ProfileCard coMonitorId={user.userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
