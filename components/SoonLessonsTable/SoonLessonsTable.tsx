import { getLimitCoursesByStudent } from "@/src/db/queries/select";

interface IProps {
  studentId: number;
}
const Table = async (props: IProps) => {
  const courses = await getLimitCoursesByStudent(Number(props.studentId));
  const today = new Date();

  const coursesWithNextLecture = courses?.map((course) => {
    const courseStartDate = new Date(course.startDate);
    const courseEndDate = new Date(course.endDate);
    const currentDate = new Date(today);

    let nextLecture = null;

    while (currentDate <= courseEndDate) {
      const dayOfWeek = currentDate.getDay();

      if ([0, 1, 3].includes(dayOfWeek) && currentDate >= courseStartDate) {
        const dateStr = currentDate.toLocaleDateString("en-GB");
        const dayName = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        nextLecture = {
          day: dayName,
          date: dateStr,
          startTime: "10:00 AM",
          endTime: "12:00 PM",
        };
        break;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      ...course,
      nextLecture,
    };
  });

  return (
    <div data-testid="courses-table-wrapper" className="w-full max-w-4xl overflow-x-auto">
      {coursesWithNextLecture && coursesWithNextLecture.length >= 1 ? (
        <div data-testid="courses-table-container" className="overflow-x-auto border border-gray-200 shadow-sm rounded-b-xl">
          <table className="w-full border-collapse bg-white text-sm" data-testid="courses-table">
            <thead>
              <tr className="bg-gray-50">
                <th data-testid="th-course" className="px-8 py-8 text-left font-medium text-gray-500">Course</th>
                <th data-testid="th-date" className="px-8 py-8 text-left font-medium text-gray-500">Date</th>
                <th data-testid="th-day" className="px-8 py-8 text-left font-medium text-gray-500">Day</th>
                <th data-testid="th-start-time" className="px-8 py-8 text-left font-medium text-gray-500">Start Time</th>
                <th data-testid="th-end-time" className="px-8 py-8 text-left font-medium text-gray-500">End Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coursesWithNextLecture
                ?.filter(
                  (course) => new Date(course.endDate) >= new Date(today)
                )
                .map((course) => (
                  <tr data-testid="course-row" key={course.id} className="hover:bg-gray-50">
                    <td data-testid="course-title" className="px-8 py-8 font-medium text-gray-900">{course.title}</td>
                    <td data-testid="course-date" className="px-8 py-8 text-gray-700">{course.nextLecture?.date}</td>
                    <td data-testid="course-day" className="px-8 py-8 text-gray-700">{course.nextLecture?.day}</td>
                    <td data-testid="course-start" className="px-8 py-8 text-gray-700">{course.nextLecture?.startTime}</td>
                    <td data-testid="course-end" className="px-8 py-8 text-gray-700">{course.nextLecture?.endTime}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 data-testid="no-courses-message" className="w-full text-center text-2xl font-semibold text-gray-700 mb-2">
          There are no courses to show
        </h2>
      )}
    </div>
  );
};

export default Table;
