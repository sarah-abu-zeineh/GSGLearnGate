"use client";
import React, { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal/EditProfileModal";

const EditPassword = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className="border-1 p-5 rounded-md"
      data-testid="edit-password-container"
    >
      <div
        className="flex justify-between items-center"
        data-testid="edit-password-header"
      >
        <p className="text-xl font-bold" data-testid="edit-password-title">
          Password
        </p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
          data-testid="edit-password-button"
        >
          Edit
        </button>
      </div>

      <p
        className="text-[#777] text-sm"
        data-testid="edit-password-hidden-value"
      >
        ●●●●●●●●
      </p>

      {openModal && (
        <EditProfileModal
          onClose={() => setOpenModal(false)}
          typeOfEdit="editPassword"
          data-testid="edit-password-modal"
        />
      )}
    </div>
  );
};

export default EditPassword;
