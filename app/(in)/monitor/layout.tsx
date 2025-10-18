import Sidebar from "@/components/Sidebar/Sidebar";
import {
  Student,
  UserGear,
  UserCirclePlus,
  Control,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarLink } from "@/types/user";
import { Metadata } from "next";

const links: SidebarLink[] = [
  {
    href: "/monitor",
    label: "Dashboard",
    icon: <Control size={20} weight="bold" />,
  },
  {
    href: "/monitor/students",
    label: "Students",
    icon: <Student size={20} weight="bold" />,
  },
  {
    href: "/monitor/joining-requests",
    label: "Joining Requests",
    icon: <UserCirclePlus size={20} weight="bold" />,
  },
  {
    href: "/monitor/tasks",
    label: "Tasks",
    icon: <Student size={20} weight="bold" />,
  },
  {
    href: "/monitor/announcements",
    label: "Announcement",
    icon: <UserGear size={20} weight="bold" />,
  },
];

export const metadata: Metadata = {
  title: "Monitor Dashboard - Manage Students, Tasks, and Courses",
  description:
    "Manage students, tasks, assignments, and course progress efficiently with our Monitor Dashboard.",
  keywords:
    "monitor dashboard, manage students, manage tasks, assignments, course management",
  openGraph: {
    title: "Monitor Dashboard - Manage Students & Tasks",
    description:
      "Easily manage student tasks, assignments, and courses in one place.",
    url: "https://gsg-learn-gate.vercel.app/monitor",
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
      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
