import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "phosphor-react";
import { JoiningOrder } from "@/types";

interface JoiningOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  order: JoiningOrder;
}

export default function RejectJoiningModal({
  isOpen,
  onClose,
  order,
  onApprove,
}: JoiningOrderModalProps) {
  if (!isOpen) return null;

  return (
    <div
      data-testid="reject-joining-modal-overlay"
      className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50"
    >
      <motion.div
        data-testid="reject-joining-modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative"
      >
        <button
          data-testid="reject-joining-modal-close"
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
        >
          <X size={16} weight="bold" />
        </button>
        <h2
          data-testid="reject-joining-modal-title"
          className="my-3 text-sm font-normal text-red-700"
        >
          Are you certain you want to reject {order.firstName} {order.lastName}{" "}
          from joining the {order.courseName} course?
        </h2>
        <div
          data-testid="reject-joining-modal-user-info"
          className="flex items-center gap-3 border-b pb-3 mb-4"
        >
          <Image
            src={order.image ?? ""}
            alt="User"
            width={50}
            height={50}
            className="rounded-full border border-gray-300"
          />
          <div>
            <h2
              data-testid="reject-joining-modal-user-name"
              className="text-lg font-semibold text-gray-800"
            >
              {order.firstName} {order.lastName}
            </h2>
            <p
              data-testid="reject-joining-modal-user-email"
              className="text-sm text-gray-500"
            >
              {order.email}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            data-testid="reject-joining-modal-cancel"
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            data-testid="reject-joining-modal-reject"
            onClick={() => onApprove(order.id)}
            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Reject
          </button>
        </div>
      </motion.div>
    </div>
  );
}
