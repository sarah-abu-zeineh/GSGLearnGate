import CreateTaskForm from "@/components/Task/CreateTaskForm/CreateTaskForm";
import { requireAuth } from "@/context/auth";

import { getCoMonitorCoursesNames } from "@/services/courses";

export default async function CreateTaskPage() {
  const user = await requireAuth();
  const coursesList = await getCoMonitorCoursesNames(user.userId);

  return <CreateTaskForm coursesList={coursesList} />;
}
