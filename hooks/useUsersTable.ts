import { useSearch } from "@/hooks/useSearch";
import {
  getAllCoMonitors,
  getAllMonitors,
  getAllStudents,
} from "@/services/users";
import { useState, useEffect } from "react";
import { MonitorsJoinUsers } from "@/types";

export const useUsersTable = (role: string) => {
  const { value, setValue, updateSearchParam } = useSearch("name");
  const [users, setUsers] = useState<MonitorsJoinUsers[] | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const apiMap = {
        MONITOR: getAllMonitors,
        CO_MONITOR: getAllCoMonitors,
        STUDENT: getAllStudents,
      };

      const fetchFunction = apiMap[role as keyof typeof apiMap];
      if (!fetchFunction) return;

      const response = await fetchFunction(currentPage, pageSize);
      if (response) {
        setTotalPages(Math.ceil(response.totalCount / pageSize));
        setUsers(response.users);
      }
    } catch (error) {
      throw new Error("CODE:10005");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, role]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);
    updateSearchParam(searchValue);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedMonitor(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    setOpen(false);
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

  const filteredUsers: MonitorsJoinUsers[] = users
    ? users.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    : [];

  return {
    value,
    handleSearchChange,
    filteredUsers,
    open,
    setOpen,
    selectedMonitor,
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
