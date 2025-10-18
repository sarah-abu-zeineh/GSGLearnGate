import FullCourseCard from "@/components/FullCourseCard/FullCourseCard";
import { requireAuth } from "@/context/auth";
import { getCoursesDataByStudent } from "@/src/db/queries/select";

const MyCourses = async () => {
  const data = await requireAuth();
  const studentId = data.userId;
  const courses = await getCoursesDataByStudent(Number(studentId));

  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses && courses.length >= 1 ? (
          courses.map((course) => (
            <FullCourseCard
              key={course.id}
              course={course}
              studentId={studentId}
            />
          ))
        ) : (
          <h2 className="w-full text-center text-2xl font-semibold text-gray-700 mb-2">
            There are no courses to show
          </h2>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
