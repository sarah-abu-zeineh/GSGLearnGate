import Sidebar from "@/components/Sidebar/Sidebar";
import { SidebarLink } from "@/types/user";
import {
  Megaphone,
  CallBell,
  ClipboardText,
  Student,
  House,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";

import { Metadata } from "next";

const links: SidebarLink[] = [
  {
    href: "/co-monitor",
    label: "Dashboard",
    icon: <House size={24} weight="bold" />,
  },
  {
    href: "/co-monitor/tasks",
    label: "Tasks",
    icon: <ClipboardText size={20} weight="bold" />,
  },
  {
    href: "/co-monitor/students",
    label: "Students",
    icon: <Student size={20} weight="bold" />,
  },
  {
    href: "/co-monitor/schedule",
    label: "Attendance",
    icon: <CallBell size={20} weight="bold" />,
  },
  {
    href: "/co-monitor/announcements",
    label: "Announcements",
    icon: <Megaphone size={20} weight="bold" />,
  },
  {
    href: "/co-monitor/availability",
    label: "Meetings schedule",
    icon: <VideoCamera size={20} weight="bold" />,
  },
];

export const metadata: Metadata = {
  title: "Co-Monitor Dashboard - Manage Students, Tasks, and Courses",
  description:
    "Manage students, tasks, assignments, and course progress efficiently with our Monitor Dashboard.",
  keywords:
    "co-monitor dashboard, manage students, manage tasks, assignments, course management",
  openGraph: {
    title: "co-Monitor Dashboard - Manage Students & Tasks",
    description:
      "Easily manage student tasks, assignments, and courses in one place.",
    url: "https://gsg-learn-gate.vercel.app/co-monitor",
    type: "website",
  },
};

export default function MonitorDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={links} />
      <main className="flex-grow px-4 py-6">
        <div className="max-w-[1200px] mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
