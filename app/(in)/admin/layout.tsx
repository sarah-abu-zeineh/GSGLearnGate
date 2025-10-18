import Sidebar from "@/components/Sidebar/Sidebar";
import {
  House,
  Book,
  Users,
  Student,
  Megaphone,
  UserGear,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarLink } from "@/types/user";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Admin Dashboard - Manage courses, students, monitors and co-monitors, sending course announcement",
  description:
    "Manage courses, students, monitors and co-monitors, sending course announcement, schedule courses.",
  keywords:
    "admin dashboard, manage students, manage monitors, manage co-monitors, course management",
  openGraph: {
    title: "Admin Dashboard - Manage Monitors, Co-monitors, Students & Courses",
    description:
      "Easily manage student, monitors, co-monitors, and courses in one place.",
    url: "https://gsg-learn-gate.vercel.app/admin",
    type: "website",
  },
};

const links: SidebarLink[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <House size={24} weight="bold" />,
  },
  {
    href: "/admin/courses",
    label: "Courses",
    icon: <Book size={24} weight="bold" />,
  },
  {
    href: "/admin/monitors",
    label: "Monitors",
    icon: <UserGear size={24} weight="bold" />,
  },
  {
    href: "/admin/co-monitors",
    label: "Co-Monitors",
    icon: <Users size={24} weight="bold" />,
  },
  {
    href: "/admin/add-monitor",
    label: "Add Monitors",
    icon: <UserPlus size={24} weight="bold" />,
  },
  {
    href: "/admin/students",
    label: "Students",
    icon: <Student size={24} weight="bold" />,
  },
  {
    href: "/admin/announcement",
    label: "Announcement",
    icon: <Megaphone size={24} weight="bold" />,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar links={links} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
