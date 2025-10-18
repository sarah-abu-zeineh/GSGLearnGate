"use client";

import { useState, useEffect } from "react";
import { AssignmentStatus, SubmissionsTask } from "@/types";
import { fetchSubmissions } from "@/services/co-mentor-func";

export function useStudentSubmissions(taskId: number, searchQuery: string) {
  const [SelectedStatus, setSelectedStatus] = useState("All");
  const [submissions, setSubmissions] = useState<SubmissionsTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const submissionData = await fetchSubmissions(taskId, 1, pageSize * 10);
        submissionData && setSubmissions(submissionData.submissions || []);
        submissionData &&
          setTotalPages(Math.ceil(submissionData.totalCount / pageSize));
      } catch (error) {
        throw new Error("CODE:10004");
      }
      setLoading(false);
    };
    fetchData();
  }, [taskId]);

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearchQuery = submission.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      SelectedStatus === "All" ||
      submission.status.toLowerCase() === SelectedStatus.toLowerCase();
    return matchesSearchQuery && matchesStatus;
  });

  const evaluatedCount = submissions.filter(
    (sub) => sub.status.toLowerCase() === AssignmentStatus.GRADED.toLowerCase()
  ).length;

  const pendingCount = submissions.filter(
    (sub) =>
      sub.status.toLowerCase() === AssignmentStatus.SUBMITTED.toLowerCase()
  ).length;

  const notSubmittedCount = submissions.filter(
    (sub) =>
      sub.status.toLowerCase() === AssignmentStatus.NOTSUBMITTED.toLowerCase()
  ).length;

  const countSubmisson = submissions.length;

  const currentPageData = filteredSubmissions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const onPageChange = (page: number) =>
    setCurrentPage(page >= 1 && page <= totalPages ? page : currentPage);

  return {
    SelectedStatus,
    setSelectedStatus,
    submissions: currentPageData,
    evaluatedCount,
    pendingCount,
    notSubmittedCount,
    loading,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    countSubmisson,
  };
}
