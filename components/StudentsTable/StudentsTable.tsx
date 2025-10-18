"use client";
import PersonCard from "../PersonCard/PersonCard";
import SelectCourse from "../Dropdowns/SelectCourse";
import Loader from "../Shared/Loader";
import useStudentsList from "@/hooks/useStudentsList";
import TempPagination from "../Pagination/TempPagination";

interface IProps {
  coursesList: { courseId: number; courseName: string }[] | null;
}

export default function StudentRequestsTable({ coursesList }: IProps) {
  const {
    students,
    currentPage,
    isLoading,
    handlePreviousPage,
    onPageChange,
    handleNextPage,
    totalPages,
    courseId,
  } = useStudentsList();

  if (isLoading) {
    return <Loader message="Loading data..." data-testid="loader" />;
  }

  return (
    <div data-testid="student-requests-wrapper" className="container mx-auto p-4">
      <div className="my-5">
        <SelectCourse
          data-testid="select-course-dropdown"
          options={coursesList}
          value={courseId}
          appendSearchParams={true}
        />
      </div>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div
          data-testid="students-list-wrapper"
          className="divide-y divide-orange-100 max-h-96 overflow-y-auto pr-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#FFA41F #F8FAFC" }}
        >
          {students.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 items-center">
                <tr>
                  <th className="px-6 py-3">Student</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    data-testid={`student-row-${index}`}
                    className="bg-white hover:bg-gray-50 h-full border-b border-gray-100"
                    key={student.email + index}
                  >
                    <td>
                      <PersonCard
                        data-testid={`person-card-${index}`}
                        email={student.email ?? ""}
                        imageURL={student.image ?? "/profile (1).png"}
                        name={student.firstName + " " + student.lastName}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div data-testid="no-data" className="p-4 border-none text-center">
              No data to view
            </div>
          )}
        </div>
      </div>

      <div className="mt-9">
        <TempPagination
          data-testid="pagination-component"
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
