import StudentRequestsTable from "@/components/StudentRequestsTable/StudentRequestsTable";
import { requireAuth } from "@/context/auth";
import { getMonitorCoursesNames } from "@/services/courses";

export default async function joiningRequestsPage() {
  const { userId } = await requireAuth();
  const coursesList = await getMonitorCoursesNames(userId);
  return (
    <div>
      <h2 className="mx-8 mt-11 font-bold ">Students Joining Requests</h2>
      <StudentRequestsTable monitorCoursesList={coursesList} />
    </div>
  );
}
