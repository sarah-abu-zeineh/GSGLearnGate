import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStudentsWithMonitorCorse } from "@/services/courses";
import { StudentItem, StudentsListResponse } from "@/types/students";
import { useAuth } from "@/context/user";

export default function useStudentsList() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);

  const courseId = Number(searchParams.get("courseId")) || undefined;

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const { students, totalPages }: StudentsListResponse =
        await getStudentsWithMonitorCorse(
          currentPage,
          user.userId ?? -1,
          undefined,
          pageSize,
          courseId
        );
      setTotalPages(totalPages);
      setStudents(students);
    } catch (error) {
      throw new Error("CODE:10003");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, courseId]);

  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const onPageChange = (page: number) =>
    setCurrentPage(page >= 1 && page <= totalPages ? page : currentPage);

  return {
    courseId,
    students,
    currentPage,
    pageSize,
    isLoading,
    handlePreviousPage,
    handleNextPage,
    onPageChange,
    totalPages,
  };
}
