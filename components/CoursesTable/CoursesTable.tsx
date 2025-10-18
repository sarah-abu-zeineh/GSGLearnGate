"use client";

import {
  TrashSimple,
  PencilSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { useCoursesTable } from "@/hooks/useCourseTable";
import Loader from "../Shared/Loader";
import TempPagination from "../Pagination/TempPagination";
import Link from "next/link";

export default function CoursesTable() {
  const {
    handleSearchChange,
    filteredCourses,
    open,
    setOpen,
    selectedCourse,
    handleDeleteClick,
    confirmDelete,
    isLoading,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    setCurrentPage,
  } = useCoursesTable();

  if (isLoading) {
    return <Loader message="Loading data..." />;
  }

  return (
    <div
      className="w-full mx-auto mt-4 mb-10 space-y-4"
      data-testid="courses-table-container"
    >
      <div className="relative" data-testid="courses-table-search-container">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlass
            size={20}
            className="text-[#FFA41F]"
            data-testid="courses-table-search-icon"
          />
        </div>
        <input
          type="text"
          className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-[#FFA41f]"
          placeholder="Search for course title..."
          onChange={handleSearchChange}
          data-testid="courses-table-search-input"
        />
      </div>

      <div
        className="w-full overflow-x-auto border border-gray-200 shadow-sm rounded-xl"
        data-testid="courses-table-wrapper"
      >
        <table className="w-full border-collapse bg-white text-sm" data-testid="courses-table">
          <thead className="text-left text-xs text-gray-700 uppercase bg-gray-100">
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-left">ID</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Difficulty</th>
              <th className="px-4 py-4 text-left">Monitor</th>
              <th className="px-4 py-4 text-left">Co-Monitor</th>
              <th className="px-4 py-4 text-center">Number of Students</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCourses?.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50"
                data-testid={`courses-table-row-${course.id}`}
              >
                <td
                  className="px-4 py-4 font-medium text-gray-900"
                  data-testid={`course-id-${course.id}`}
                >
                  {course.id}
                </td>
                <td
                  className="px-4 py-4 text-gray-700"
                  data-testid={`course-title-${course.id}`}
                >
                  {course.title}
                </td>
                <td
                  className="px-4 py-4 text-gray-700"
                  data-testid={`course-difficulty-${course.id}`}
                >
                  {course.difficulty}
                </td>
                <td
                  className="px-4 py-4 text-gray-700"
                  data-testid={`course-monitor-${course.id}`}
                >
                  {course.monitorName}
                </td>
                <td
                  className="px-4 py-4 text-gray-700"
                  data-testid={`course-comonitor-${course.id}`}
                >
                  {course.coMonitorName}
                </td>
                <td
                  className="px-4 py-4 text-center"
                  data-testid={`course-student-count-${course.id}`}
                >
                  {course.studentCount}
                </td>
                <td className="px-4 py-4 flex justify-center gap-2" data-testid={`course-actions-${course.id}`}>
                  <TrashSimple
                    size={18}
                    color="#ee1717"
                    weight="fill"
                    onClick={() => handleDeleteClick(course.id)}
                    className="cursor-pointer"
                    data-testid={`course-delete-${course.id}`}
                  />
                  <Link href={`/admin/courses/${course.id}`} data-testid={`course-edit-${course.id}`}>
                    <PencilSimple size={18} color="#1cc925" weight="fill" />
                  </Link>
                  <Link href={`/admin/schedule-course/${course.id}`} data-testid={`course-schedule-${course.id}`}>
                    <Plus size={18} weight="bold" color="#1c72c9" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TempPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        onPageChange={setCurrentPage}
        data-testid="courses-table-pagination"
      />

      {open && selectedCourse && (
        <DeleteUserModal
          setOpen={setOpen}
          confirmDelete={confirmDelete}
          selectedCourse={selectedCourse}
          data-testid="courses-table-delete-modal"
        />
      )}
    </div>
  );
}
