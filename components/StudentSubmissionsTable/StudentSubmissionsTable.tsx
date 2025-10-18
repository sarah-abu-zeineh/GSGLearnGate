"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, Users, Funnel, BellRinging } from "phosphor-react";
import { Share } from "@phosphor-icons/react/dist/ssr";
import StatusCard from "../StatusTaskCards/StatusCard";
import { useStudentSubmissions } from "@/hooks/useStudentSubmissions";
import TempPagination from "../Pagination/TempPagination";
import Loader from "../Shared/Loader";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import { Role } from "@/types";

interface IdTaskIprops {
  taskId: number;
  role?: string;
}

export default function StudentSubmissionsTable({ taskId, role }: IdTaskIprops) {
  const { value: searchQuery, updateSearchParam } = useSearch("search");
  const {
    SelectedStatus,
    setSelectedStatus,
    submissions,
    evaluatedCount,
    pendingCount,
    notSubmittedCount,
    countSubmisson,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    loading,
  } = useStudentSubmissions(taskId, searchQuery);

  if (loading) {
    return <Loader message="Loading data..." data-testid="loader" />;
  }

  const hidden: boolean = role !== Role.MONITOR;

  return (
    <div data-testid="student-submissions-wrapper" className="min-h-screen">
      <div className="container mx-auto flex-col gap-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatusCard
            data-testid="total-submissions-card"
            title="Total Submissions"
            icon={<Users size={22} className="text-orange-600" />}
            iconColor="orange"
            subtitle="Active submissions"
            value={evaluatedCount + pendingCount}
            progress={countSubmisson > 0 ? ((evaluatedCount + pendingCount) / countSubmisson) * 100 : 0}
          />
          <StatusCard
            data-testid="graded-card"
            title="Graded"
            icon={<CheckCircle size={22} weight="fill" className="text-green-600" />}
            iconColor="green"
            subtitle="Graded submissions"
            value={evaluatedCount}
            progress={countSubmisson > 0 ? (evaluatedCount / countSubmisson) * 100 : 0}
          />
          <StatusCard
            data-testid="pending-card"
            title="Pending"
            icon={<Clock size={22} weight="fill" className="text-red-600" />}
            iconColor="red"
            subtitle="Awaiting review"
            value={pendingCount}
            progress={countSubmisson > 0 ? (pendingCount / countSubmisson) * 100 : 0}
          />
          <StatusCard
            data-testid="not-submitted-card"
            title="Not Submitted"
            icon={<BellRinging size={22} weight="fill" className="text-gray-600" />}
            iconColor="gray"
            subtitle="Not Submitted"
            value={notSubmittedCount}
            progress={countSubmisson > 0 ? (notSubmittedCount / countSubmisson) * 100 : 0}
          />
        </div>

        <div data-testid="filter-section" className="bg-white p-4 mb-7 shadow-md rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar data-testid="search-bar" placeholderText="Search" updateSearchParam={updateSearchParam} />
            <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg h-12">
              <Funnel size={20} className="text-[#FFA41F]" />
              <select
                data-testid="status-select"
                className="w-[180px] border-orange-200 focus:ring-orange-200"
                value={SelectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Submissions</option>
                <option value="GRADED">Graded</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="NOT SUBMITTED">Not Submitted</option>
              </select>
            </div>
          </div>
        </div>

        <div data-testid="submissions-table-section" className="bg-white p-4 shadow-md rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>
          <div className="container mx-auto p-6">
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left text-gray-800 border border-gray-200 rounded-lg">
                <thead className="text-m text-gray-600 uppercase bg-[#FFA41F]/10">
                  <tr className="h-14">
                    <th className="px-6 py-3">Student</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Task</th>
                    <th className="px-6 py-3">Grade</th>
                    <th className="px-6 py-3">Status</th>
                    {hidden && <th className="px-6 py-3">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr
                      key={submission.submissionId}
                      data-testid={`submission-row-${index}`}
                      className="bg-white hover:bg-orange-50 transition duration-300 border-b border-gray-100 h-14"
                    >
                      <td className="flex items-center px-6 py-3">
                        <Image
                          data-testid={`submission-image-${index}`}
                          className="rounded-full border border-gray-300 w-6 h-6"
                          src={submission.profilePicture}
                          alt="User"
                          width={24}
                          height={24}
                        />
                        <div className="ml-2">
                          <div data-testid={`submission-name-${index}`} className="font-medium truncate max-w-[120px]">
                            {submission.studentName}
                          </div>
                          <div data-testid={`submission-email-${index}`} className="text-gray-500 text-xs truncate max-w-[120px]">
                            {submission.email}
                          </div>
                        </div>
                      </td>
                      <td data-testid={`submission-date-${index}`} className="px-6 py-3">{submission.submissionDate}</td>
                      <td data-testid={`submission-course-${index}`} className="px-6 py-3">{submission.courseName}</td>
                      <td data-testid={`submission-task-${index}`} className="px-6 py-3">{submission.taskName}</td>
                      <td data-testid={`submission-grade-${index}`} className="px-6 py-3 font-semibold text-orange-600">
                        {submission.grade}/{submission.points}
                      </td>
                      <td
                        data-testid={`submission-status-${index}`}
                        className={`px-6 py-3 font-semibold ${
                          submission.status === "GRADED"
                            ? "text-green-600"
                            : submission.status === "PENDING"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {submission.status}
                      </td>
                      {hidden && (
                        <td data-testid={`submission-action-${index}`} className="px-6 py-3">
                          <Link href={`/co-monitor/tasks/students-submissions-list/${submission.submissionId}`}>
                            <button
                              className={`w-[100px] rounded-xl flex h-10 justify-center items-center transition duration-300 cursor-pointer ${
                                submission.status === "NOT SUBMITTED"
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-orange-400 hover:bg-orange-500 text-white"
                              }`}
                              disabled={submission.status === "NOT SUBMITTED"}
                            >
                              <Share size={20} className="mr-2" />
                              <span>View</span>
                            </button>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div data-testid="pagination-component" className="mt-9">
              <TempPagination
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
