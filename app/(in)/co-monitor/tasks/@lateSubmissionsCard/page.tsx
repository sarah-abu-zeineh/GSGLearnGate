import { requireAuth } from "@/context/auth";
import { getLateSubmissionsCoMonitorsCount } from "@/services/submission";
import { Warning } from "@phosphor-icons/react/dist/ssr";

export default async function LateSubmissionsCard() {
  const { userId } = await requireAuth();
  const count = await getLateSubmissionsCoMonitorsCount(userId);
  return (
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Late Submissions</h3>
        <div className="bg-red-100 p-2 rounded-full">
          <Warning size={20} weight="fill" className="text-red-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">{count}</p>
    </div>
  );
}
