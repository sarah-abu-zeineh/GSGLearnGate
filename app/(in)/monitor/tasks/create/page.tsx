import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { requireAuth } from "@/context/auth";
import { getMonitorCoursesNames } from "@/services/courses";
export default async function CreateTaskPage() {
  const { userId } = await requireAuth();
  const coursesList = await getMonitorCoursesNames(userId);

  return <CreateTaskForm coursesList={coursesList} />;
}
