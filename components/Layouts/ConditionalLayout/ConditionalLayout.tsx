"use client";

import { usePathname } from "next/navigation";
import CreateTaskButton from "@/components/CreateTaskButtom/CreateTaskButtom";

export default function ConditionalLayout({
  children,
  activeTasksCard,
  lateSubmissionsCard,
  submissionsAwaitingReview,
  tasksList,
  role,
}: {
  children: React.ReactNode;
  activeTasksCard: React.ReactNode;
  lateSubmissionsCard: React.ReactNode;
  submissionsAwaitingReview: React.ReactNode;
  tasksList: React.ReactNode;
  role: string;
}) {
  const path = usePathname();

  if (path !== `/${role}/tasks`) return <>{children}</>;

  return (
    <div data-testid="tasks-layout" className="max-w-6xl mx-auto p-4 md:p-6">
      <div
        data-testid="tasks-header"
        className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
      >
        <h1 data-testid="tasks-title" className="text-2xl font-bold text-[#FFA41F]">
          Tasks & Assignments
        </h1>
        <CreateTaskButton link={`/${role}/tasks/create`} />
      </div>

      <div
        data-testid="tasks-summary-cards"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        {activeTasksCard}
        {submissionsAwaitingReview}
        {lateSubmissionsCard}
      </div>

      <div data-testid="tasks-list">{tasksList}</div>
    </div>
  );
}
