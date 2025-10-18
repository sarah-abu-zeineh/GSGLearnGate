import { requireAuth } from "@/context/auth";
import { getActiveTasksCoMonitorCount } from "@/services/task";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default async function ActiveTasksCard() {
  const { userId } = await requireAuth();
  const activeTasksCount = await getActiveTasksCoMonitorCount(userId);
  return (
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Active Tasks</h3>
        <div className="bg-green-100 p-2 rounded-full">
          <CheckCircle size={20} weight="fill" className="text-green-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">
        {activeTasksCount}
      </p>
    </div>
  );
}
