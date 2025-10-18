import StudentsTable from "@/components/StudentsTable/StudentsTable";
import { requireAuth } from "@/context/auth";
import {
  getCoMonitorCoursesNames,
  getMonitorCoursesNames,
} from "@/services/courses";
import { Role } from "@/types";

export default async function StudentsPage() {
  const role = Role.MONITOR;
  const { userId } = await requireAuth();
  let coursesList: { courseId: number; courseName: string }[] | null = [];
  if (role == Role.MONITOR) {
    coursesList = await getMonitorCoursesNames(userId);
  } else {
    coursesList = await getCoMonitorCoursesNames(userId);
  }

  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students List</h2>
      <StudentsTable coursesList={coursesList} />
    </div>
  );
}
