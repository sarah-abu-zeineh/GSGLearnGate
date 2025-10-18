import NotRegisteredCourseCard from "@/components/NotRegisteredCourseCard/NotRegisteredCourseCard";
import { getNotStartedCoursesNotRegisteredByStudent } from "@/src/db/queries/select";
import { requireAuth } from "@/context/auth";

const ComingSoonCourses = async () => {
  const data = await requireAuth();
  const studentId = data.userId;

  const courses = await getNotStartedCoursesNotRegisteredByStudent(
    Number(studentId)
  );
  const filteredCourses = courses?.filter(
    (course) => new Date(course.applyEndDate).getTime() > new Date().getTime()
  );

  return (
    <div className="px-6 py-3 w-full min-h-screen mb-10">
      <h1 className="text-4xl font-bold text-gray-800 my-4">
        Coming Soon Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses && filteredCourses.length >= 1 ? (
          filteredCourses?.map((course) => (
            <NotRegisteredCourseCard
              key={course.id}
              course={course}
              studentId={studentId}
            />
          ))
        ) : (
          <h3 className="text-lg font-semibold">
            Sorry! Currently there are no soon courses
          </h3>
        )}
      </div>
    </div>
  );
};

export default ComingSoonCourses;
