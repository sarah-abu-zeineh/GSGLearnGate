import { useSearch } from "@/hooks/useSearch";
import { getCourses, removeCourse } from "@/services/courses";
import { CourseJoinStudent } from "@/types";
import { useState, useEffect } from "react";

export const useCoursesTable = () => {
  const { value, setValue, updateSearchParam } = useSearch("title");
  const [fetchedCourses, setFetchedCourses] = useState<
    CourseJoinStudent[] | null
  >(null);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchCourses = async () => {
    setIsLoading(true);
    const response = await getCourses(currentPage, pageSize);
    if (response) {
      setTotalPages(Math.ceil(response.totalCount / pageSize));
      setFetchedCourses(response.courses);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);
    updateSearchParam(searchValue);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCourse(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      removeCourse(selectedCourse);
    }
    setOpen(false);
    fetchCourses();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCourses: CourseJoinStudent[] = fetchedCourses
    ? fetchedCourses.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase())
      )
    : [];
  return {
    value,
    handleSearchChange,
    filteredCourses,
    open,
    setOpen,
    selectedCourse,
    handleDeleteClick,
    confirmDelete,
    isLoading,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
