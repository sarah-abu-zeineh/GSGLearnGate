import { JoiningOrder, Status } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getJoiningRequests,
  updateJoiningRequestStatus,
} from "@/services/joiningRequest";
import { addStudentToCourse } from "@/services/courses";
import { useAuth } from "@/context/user";

export default function useStudentRequests() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [courseId, setCourseId] = useState<number | undefined>(
    Number(searchParams.get("courseId")) || undefined
  );
  const [joiningOrders, setJoiningOrders] = useState<JoiningOrder[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<JoiningOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchRequests = async () => {
    const { JoiningOrders, totalPages } = await getJoiningRequests(
      user.userId ?? -1,
      courseId,
      currentPage,
      pageSize
    );
    setTotalPages(totalPages);
    setJoiningOrders(JoiningOrders);
    setIsLoading(false);
  };

  useEffect(() => {
    setCourseId(Number(searchParams.get("courseId")) || undefined);
    try {
      fetchRequests();
    } catch {
      throw new Error("CODE:10002");
    }
  }, [currentPage, searchParams, courseId]);

  const handleOpenRejectModal: Function = (order: JoiningOrder) => {
    setSelectedOrder(order);
    setIsRejectModalOpen(true);
  };

  const handleOpenApproveModal = (order: JoiningOrder) => {
    setSelectedOrder(order);
    setIsApproveModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedOrder(null);
  };

  const handleApprove = async (
    id: number,
    courseId: number,
    studentId: number
  ) => {
    try {
      await addStudentToCourse(studentId, courseId);
      await updateJoiningRequestStatus(id, Status.ACCEPTED);
      await fetchRequests();
    } catch (error) {
      console.error("Approval failed:", error);
    } finally {
      handleCloseApproveModal();
    }
  };

  const handleReject = async (id: number) => {
    await updateJoiningRequestStatus(id, Status.REJECTED);
    handleCloseRejectModal();
    await fetchRequests();
  };

  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const onPageChange = (page: number) =>
    setCurrentPage(page >= 1 && page <= totalPages ? page : currentPage);

  return {
    courseId,
    joiningOrders,
    currentPage,
    pageSize,
    isApproveModalOpen,
    isRejectModalOpen,
    selectedOrder,
    isLoading,
    handleOpenRejectModal,
    handleOpenApproveModal,
    handleCloseRejectModal,
    handleCloseApproveModal,
    handleApprove,
    handleReject,
    handlePreviousPage,
    handleNextPage,
    onPageChange,
    totalPages,
  };
}
